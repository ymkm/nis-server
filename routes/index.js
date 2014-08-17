var express = require('express');
var router = express.Router();


if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

/* GET home page. */
router.get('/', function (req, res) {
    redis.set("hello", "world");

    redis.get('hello', function (error, result) {
        if (error) console.log('Error: ' + error);
        else  res.render('index', { title: result });
    });

});

module.exports = router;
