var Q = require('q');
var _ = require('lodash');
var C = require('../config/config.json');
var U = require('../lib/util.js');
redis = require('redis');

if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

function update(thing, data) {
    redis.hmset(thing, U.stampTime(data), function (err, reply) {
        //
    });
}

function get(thing) {
    return Q.Promise(function (resolve, reject) {

        redis.hgetall(thing, function (error, result) {
            if (error) reject(new Error('error getting' + thing + ' ' + error));
            else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    update: update,
    get: get
};
