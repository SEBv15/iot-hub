var express = require("express")
var checkAuth = require("./checkAuth")

module.exports = function(db, mqtt) {
    var api = express.Router()

    api.all("/", (req, res) => {
        res.send("API v1")
    })

    api.use("/auth", require("./auth")(db))
    api.use("/things", require("./things")(db, mqtt))

    return api
}