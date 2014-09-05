var Q = require('q');
var _ = require('lodash');
var request = require('request');
var C = require('../config/config.json');
var U = require('../lib/util.js');

var REQUEST_TIMEOUT = 5000;

function update(thing, data) {

    return Q.Promise(function (resolve, reject) {

        request({
            url: C.dweet.for + thing,
            jar: true,
            method: "POST",
            followAllRedirects: true,
            timeout: REQUEST_TIMEOUT,
            strictSSL: true,
            json: U.stampTime(data)
        }, function (err, response, dweet) {
            if (!err) {
                resolve(dweet);

            } else {
                reject(new Error(err));
            }
        });
    });
}


module.exports = {
    update: update
};