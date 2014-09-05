var Q = require('q');
var C = require('../config/config.json');
var U = require('../lib/util.js');

var pubnub = require("pubnub").init({
    publish_key: C.pubnub.publishKey,
    subscribe_key: C.pubnub.subscribeKey
});

function publish(thing, data) {

    return Q.Promise(function (resolve, reject) {

        pubnub.publish({
            channel: thing,
            message: U.stampTime(data),
            callback: function (e) {
                console.log(e);
                resolve("SUCCESS!", e);
            },
            error: function (e) {
                reject("FAILED! RETRY PUBLISH!", e);
            }
        });
    });
}

module.exports = {
    publish: publish
};


