var Q = require('q');
var QC = require('q-combinators');
var _ = require('lodash');
var redis = require('../clients/redis');
var C = require('../config/config.json');
var tides = require('../clients/tides');

var express = require('express');
var router = express.Router();

function get(key) {

    return redis.get(C.key[key])
        .then(function (data) {
            if (data === null) {
                throw new Error("This was null: " + key);
            }
            return data;
        });
}

router.get('/', function (req, res) {

    QC.object.fulfilled({
        email: get("email"),
        weather: get("weather"),
        tides: get("tides"),
        location: get("location")
    })
        .then(function (data) {

            if (!_.isUndefined(data.tides)) {
                data.tides = tides.calculateCurrent(data.tides);
            }

            res.header('Content-Type', 'application/json; charset=utf-8');
            res.header('Access-Control-Allow-Origin', '*');
            res.send(JSON.stringify(data));

        }).fail(function (error) {
            console.log(error);
            res.send(500, JSON.stringify(error.message));
        }).done();

});

module.exports = router;
