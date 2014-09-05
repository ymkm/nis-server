var Q = require('q');
var _ = require('lodash');
var request = require('request');
var C = require('../config/config.json');
var U = require('../lib/util');

function getTides() {
    return Q.Promise(function (resolve, reject) {
        request(C.tidesUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(response.body);
                resolve(format(data));
            } else {
                reject(error);
            }
        });
    });
}
function format(data) {

    return {
        "nextHeight": data.results.next_high.height,
        "nextTime": data.results.next_high.time,
        "updated": data.results.current_time
    }
}

function calculateCurrent(data) {

    var nextHeight = data.nextHeight;
    var next = data.nextTime;
    var updated = data.updated;
    var now = U.timestamp();

    var delta = next - now;

    hours = Math.floor(delta / 3600);
    minutes = ((delta % 3600) / 60).toFixed(0);

    //The time difference between high and low tides is 6 hours / 12.5 minutes
    //which in seconds is :
    var between_high_and_low_delta = 22356;

    hours_as_fraction = Math.abs((between_high_and_low_delta - delta) / between_high_and_low_delta) * 100;
    rounded = hours_as_fraction.toFixed(2);

    return {
        "now": now,
        "nextHours": hours,
        "nextMins": minutes,
        "nextHeight": nextHeight,
        "nextTime": next,
        "updated": updated,
        "currentHeightPercent": rounded
    }
}

module.exports = {
    getTides: getTides,
    format: format,
    calculateCurrent: calculateCurrent
};
