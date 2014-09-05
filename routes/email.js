var Q = require('q');
var express = require('express');
var moment = require('moment');
var C = require('../config/config.json');

var router = express.Router();

var email = require('../clients/email');
var redis = require('../clients/redis');
var pubnub = require('../clients/pubnub');

router.get('/', function (req, res) {

    redis.get(C.key.email).then(function (savedCount) {

        return email.getUnreadCount().
            then(function (count) {

                if (newEmail(savedCount, count)) {
                    var email = {"count": count, updated: new Date()};
                    return pubnub.publish(C.key.email, email).
                        then(function (pubres) {
                            redis.update(C.key.email, email);
                            res.send('set email, count ' + email.count);
                        })
                } else {
                    res.send('email unchanged , count ' + count);
                }
            })
    }).fail(function (error) {
        console.log(error);
        res.send(500, JSON.stringify(error.message));
    }).done();
});

function newEmail(savedCount, newCount) {

    if (savedCount === null) return true;
    return savedCount.count != newCount;
}

module.exports = router;