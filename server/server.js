require('dotenv').config()
var path = require("path")

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var connected = {
    mongodb: false,
    mqtt: false
}
 
// Connection URL
const url = 'mongodb://192.168.1.101:27017';
 
// Database Name
const dbName = 'iot-hub';

var db;
var client;

async function connect() {
    // if in production
    if (process.env.ENV != "development") {
        // wait 10 seconds before starting so MQTT and MongoDB can start up first
        await new Promise(r => setTimeout(r, 10000))
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        db = client.db(dbName);

        connected.mongodb = true
        start()
    });

    var mqtt = require('mqtt')
    client  = mqtt.connect('mqtt://192.168.1.101', {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    })

    client.on("connect", function() {
        connected.mqtt = true
        start()
    })

    // Clients say hi
    client.subscribe("iot/hello")
    // Events to be sent to the server
    client.subscribe("iot/events")
}

connect()

async function start() {
    if (!connected.mongodb || !connected.mqtt)
        return

    console.log("CONNECTED")
    app.use("/api/v1/", require("./api/api")(db, client))
    if (process.env.ENV != "development") {
        app.use(express.static(path.join(__dirname, 'build')))
        app.use("*", express.static(path.join(__dirname, 'build/index.html')))
    } else {
        app.use('/', webappProxy);
    }

    // subscribe to all devices
    var things = await db.collection("things").find().toArray()
    for (thing of things) {
        client.subscribe("iot/"+thing.uid+"/send")
    }

    client.on("message", function(topic, message) {
        message = message.toString()
        if (topic == "iot/hello")
            onHello(message)
        if (topic.endsWith("/send"))
            onData(topic.split("/")[1], message)
    })

    async function onHello(config) {
        try {
            config = JSON.parse(config)
        } catch(err) {
            client.publish("iot/config", "err: Invalid JSON", {qos: 2})
            return
        }

        var defaultConfig = {
            name: "Unnamed",
            data: {},
            mainProp: "",
            icon: null,
            type: "mqtt"
        }

        console.log(Object.keys(config))

        var keys = Object.keys(config)

        if (!config["uid"] || !config["props"] || !(config.props.constructor == Object)) {
            client.publish("iot/config", "err: Not all fields supplied", {qos: 2})
            return
        }

        var res = await db.collection("things").findOne({uid: config.uid})
        console.log(res)

        if (!res) {
            var config = {...defaultConfig, ...config}
            await db.collection("things").insertOne(config)
        } else {
            await db.collection("things").updateOne({uid: config.uid}, {
                $set: {
                    props: config.props, 
                    mainProp: config.mainProp,
                    icon: config.icon
                }
            })
        }

        console.log("SENDING")
        client.subscribe(`iot/${config.uid}/send`)
        //client.publish("iot/config", config.uid, {qos: 2})
        for (var prop of Object.keys(config.props)) {
            console.log(prop)
            if (res.data[prop] === undefined) {
                switch(config.props[prop]) {
                    case "number":
                        res.data[prop] = "0"
                        break
                    case "":
                    case "string":
                        res.data[prop] = ""
                        break
                    case "boolean":
                        res.data[prop] = "false"
                        break
                    default:
                        var m = config.props[prop].split("-")
                        if (m.length == 2)
                            res.data[prop] = m[0]
                        else
                            res.data[prop] = ""

                }
                db.collection("things").updateOne({uid: config.uid}, {
                    $set: {data: res.data}
                })
            }
            client.publish(`iot/${config.uid}/config`, `${prop}:${res.data[prop]}`, {qos: 2})
        }
        console.log(config)
    }

    async function onData(uid, message) {
        var [prop, value] = message.split(":", 2)
        var doc = await db.collection("things").findOne({uid})
        console.log("RECEIVED", uid, prop, value)
        if (!Object.keys(doc.props).includes(prop))
            return
        var update = {}
        update["data."+prop] = value
        await db.collection("things").updateOne({uid}, {$set: update})

        // DO THE BLOCKY LOGIC SHIT
    }
}

var express = require("express")
var app = express()
var proxy = require('http-proxy-middleware');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var webappProxy = proxy({ ws: true, target: 'http://localhost:3000' });

app.listen(80)