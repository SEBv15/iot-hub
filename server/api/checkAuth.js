var jwt = require('jwt-simple');
require('dotenv').config()

/**
 * Express middleware to check supplied tokens
 * 
 * @param {Boolean} needAdmin Only allow requests made by admins
 */
module.exports = function checkAuth(needAdmin = false) {
    return function(req, res, next) {
        var token = req.body.token
        if (!token) {
            res.status(401).send({error: "No bearer token supplied"})
            return
        }
        try {
            var data = jwt.decode(token, process.env.SECRET)
        } catch(err) {
            res.status(401).send({error: "Bad token"})
            return
        }
        if (needAdmin && !data.admin) {
            res.status(401).send({error: "You need admin privileges for this request"})
        }
        req.tokenData = data
        next()
    }
}