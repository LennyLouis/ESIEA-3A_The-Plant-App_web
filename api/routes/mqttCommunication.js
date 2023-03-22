var express = require("express");
var router = express.Router();
const mqtt = require('mqtt');
const axios = require('axios');

const url = 'ws://lennylouis.fr:1883';
const options = {
    clean: true,
    connectionTimeout: 4000,
    username: 'web-backend',
    password: '1daYsb8pkTBTvnJSo61T'
};

const client = mqtt.connect(url, options);

client.on('message', (topic, msg) => {
    console.log('Message received : ', topic, msg.toString());
    router.get("/", function(req, res, next) {
        res.send(msg.toString());
    });
});

client.subscribe('test');

router.get("/", function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;