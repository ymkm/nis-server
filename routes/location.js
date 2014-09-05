var express = require('express');
var dweet = require('../clients/dweet');
var pubnub = require('../clients/pubnub');
var redis = require('../clients/redis');
var C = require('../config/config.json');
var router = express.Router();

router.get('/', function (req, res) {
    res.send("OK");
});

router.post('/', function (req, res) {
    var lat = req.body.location.latitude;
    var long = req.body.location.longitude;

    var location = {
        latitude: lat,
        longitude: long,
        map: "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=16&size=400x400"
    };

    dweet.update(C.key.location, location);

    pubnub.publish(C.key.location, location).
        then(function (pubres) {
            redis.update(C.key.location, location);
            res.send("ok");
        });
});

module.exports = router;