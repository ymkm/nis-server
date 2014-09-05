var Q = require('q');
var _ = require('lodash');
var express = require('express');
var request = require('request');
fs = require('fs');

var C = require('config');
var router = express.Router();

var weather = require('../clients/weather');
var redis = require('../clients/redis');
var pubnub = require('../clients/pubnub');

router.get('/', function (req, res) {

    redis.get(C.key.weather).then(function (savedWeather) {

        weather.getWeather().then(function (weather) {

            if (newWeather(savedWeather, weather)) {

                return pubnub.publish(C.key.weather, weather).
                    then(function (pubres) {
                        redis.update(C.key.weather, weather);
                        res.send('weather updated to ' + weather.name + " and " + weather.high + " degrees");
                    })
            } else {
                res.send('weather not updated - still ' + weather.name + " and " + weather.high + " degrees");
            }
        })

    }).fail(function (error) {
        console.log(error);
        res.send(500, JSON.stringify(error.message));
    }).done();
});

function newWeather(savedWeather, newWeather) {

    if (savedWeather === null) return true;
    return (savedWeather.code != newWeather.code) || (savedWeather.high != newWeather.high);
}

module.exports = router;