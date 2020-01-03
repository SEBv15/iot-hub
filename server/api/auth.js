var express = require("express")
var bcrypt = require("bcrypt")
var jwt = require('jwt-simple');
require('dotenv').config()
var checkAuth = require("./checkAuth")

module.exports = function(db) {
    var token = jwt.encode({username:"", admin:true}, process.env.SECRET);
    console.log(token)

    var auth = express.Router()

    auth.post("/login", async (req, res) => {
        var name = req.body.username
        var pass = req.body.password
        console.log(name, pass)
        if (!pass || !name) {
            res.status(400).send({error: "username and password required"})
            return
        }
        var user = await db.collection("users").findOne({username: name})
        if (!user) {
            res.status(401).send({error: "Username doesn't exist"})
            return
        }
        var valid = await bcrypt.compare(pass, user.hash)
        if (valid) {
            var token = jwt.encode({username: user.username, issued: Date.now(), admin: user.admin}, process.env.SECRET);
            res.send({error: null, token})
        } else {
            res.status(401).send({error: "Incorrect password"})
        }
    })

    auth.post("/listUsers", checkAuth(true), async (req, res) => {
        var users = await db.collection("users").find().toArray()
        users = users.map(({_id, hash, ...user}) => user)
        res.send({error: null, users})
    })

    auth.post("/addUser", checkAuth(true), async (req, res) => {
        var name = req.body.username.toLowerCase()
        var pass = req.body.password
        if (!pass || !name) {
            res.status(400).send({error: "username and password required"})
            return
        }
        if (await db.collection("users").findOne({username: name})) {
            res.status(409).send({error: "User already exists"})
            return
        }
        var hash = await bcrypt.hash(pass, 10)
        await db.collection("users").insertOne({
            username: name,
            hash,
            admin: req.body.admin || false,
            createdBy: req.tokenData.username,
            things: []
        })
        res.send({error: null, username: name})
    })

    return auth
}
