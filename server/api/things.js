var express = require("express")
var checkAuth = require("./checkAuth")

module.exports = function(db, mqtt) {
    var router = express.Router()

    async function checkUserAccess(req, res, next) {
        var user = await db.collection("users").findOne({username: req.tokenData.username})
        if (!user.things.includes(req.params.thing)) {
            res.status(401).send({error: "You are not allowed to access this thing"})
            return
        }
        next()
    }

    async function checkThingExists(req, res, next) {
        var thing = await db.collection("things").findOne({uid: req.params.thing})
        if (!thing) {
            res.status(400).send({error: "Thing doesn't exist"})
            return
        }
        next()
    }

    router.post("/list", checkAuth(), async (req, res) => {
        if (req.tokenData.admin) {
            var things = await db.collection("things").find().toArray()
            things = things.map(({ _id, ...item }) => item);
            res.send({error: null, things})
        } else {
            var user = await db.collection("users").findOne({username: req.tokenData.username})
            if (!user) {
                res.status(401).send({error: "User not found"})
                return
            }
            var thingList = user.things
            if (!thingList) {
                res.send([])
                return
            }
            var things = await db.collection("things").find({uid: { $in: thingList }}).toArray()
            things = things.map(({ _id, ...item }) => item);
            res.send({error: null, things})
        }
    })

    router.post("/:thing/addUser", checkAuth(true), checkThingExists, async (req, res) => {
        if (!req.body.username) {
            res.status(400).send({error: "need username"})
            return
        }
        await db.collection("users").updateOne({username: req.body.username}, {$addToSet: {things: req.params.thing}})
        res.send({error: null})
    })

    router.post("/:thing/removeUser", checkAuth(true), checkThingExists, async (req, res) => {
        if (!req.body.username) {
            res.status(400).send({error: "need username"})
            return
        }
        await db.collection("users").updateOne({username: req.body.username}, {$pull: {things: req.params.thing}})
        res.send({error: null})
    })

    router.post("/:thing", checkAuth(), checkUserAccess, checkThingExists, async (req, res) => {
        var thing = await db.collection("things").findOne({uid: req.params.thing})
        var {_id, ...thing} = thing
        res.send({error: null, thing})
    })

    router.post("/:thing/rename", checkAuth(true), checkThingExists, async (req, res) => {
        if (!req.body.name) {
            res.status(400).send({error: "Need a name"})
            return
        }
        await db.collection("things").updateOne({uid: req.params.thing}, {$set: {name: req.body.name}})
        res.send({error: null})
    })

    router.post("/:thing/setProp", checkAuth(), checkUserAccess, checkThingExists, async (req, res) => {
        if (!req.body.prop || !req.body.value) {
            res.status(400).send({error: "Need prop and value"})
            return
        }
        var thing = await db.collection("things").findOne({uid: req.params.thing})
        if (!Object.keys(thing.props).includes(req.body.prop)) {
            res.status(400).send({error: "Thing doesn't have that prop"})
            return
        }
        var propRestriction = thing.props[req.body.prop]
        switch (propRestriction) {
            case "":
                break
            case "number":
                if (!isNaN(req.body.value)) {
                    res.status(400).send({error: "Invalid value"})
                    return
                }
                break;
            case "string":
                // Could check isNaN here but numbers can also be strings
                break
            case "boolean":
                if (req.body.value == 'true' || req.body.value == 'false') {
                    break;
                } else {
                    if (req.body.value == "1" || req.body.value == "0") {
                        req.body.value = String(!!parseInt(req.body.value))
                        console.log(req.body.value)
                    } else {
                        res.status(400).send({error: "Not a valid boolean"})
                    }
                }
                break;
            default:
                // Range
                if (propRestriction.indexOf("-") >= 0) {
                    var lims = propRestriction.split("-")
                    console.log(lims)
                    if (lims.length != 2) {
                        res.status(500).send({error: "Malconfigured prop range restriction"})
                        return
                    }
                    if ((req.body.value >= lims[0] || lims[0] === "") && (req.body.value <= lims[1] || lims[1] === "")) {
                        break
                    } else {
                        res.status(400).send({error: "Value outside acceptable range"})
                        return
                    }
                } else {
                    res.status(500).send({error: "Malconfigured prop restriction"})
                    return
                }
        }
        var update = {}
        update[`data.${req.body.prop}`] = req.body.value
        // TODO: make this mqtt call more general
        mqtt.publish(`iot/${req.params.thing}/recv`, `${req.body.prop}:${req.body.value}`, {qos: 2})
        await db.collection("things").updateOne({uid: req.params.thing}, {$set: update})
        res.send({error: null})
    })

    return router
}