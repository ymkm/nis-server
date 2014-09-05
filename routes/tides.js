var Q = require('q');
var _ = require('lodash');
var express = require('express');
var request = require('request');
var U = require('../lib/util');
var C = require('config');
var router = express.Router();

var tides = require('../clients/tides');
var redis = require('../clients/redis');
var pubnub = require('../clients/pubnub');

router.get('/', function (req, res) {

    redis.get(C.key.tides).then(function (savedTides) {

        if (newTide(savedTides)) {

            tides.getTides().then(function (tides) {

                pubnub.publish(C.key.tides, tides).
                    then(function (pubres) {
                        redis.update(C.key.tides, tides);
                        res.send('set tides, ' + tides.nextHeight);
                    })
            })
        } else {
            res.send('tides unchanged, ' + savedTides.nextHeight);
        }
    }).fail(function (error) {
        console.log(error);
        res.send(500, JSON.stringify(error.message));
    }).done();
});


function newTide(oldTides) {
    if (oldTides === null) return true;
    return (oldTides.nextTime < U.timestamp());
}

module.exports = router;