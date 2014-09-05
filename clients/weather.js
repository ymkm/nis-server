var Q = require('q');
var _ = require('lodash');
var request = require('request');
var parse = require('csv-parse');
var moment = require('moment');
var C = require('config');

function getWeather() {

    return Q.all([getWeatherMap(), getWeatherForecast()]).spread(function (weatherMap, weather) {

        return {
            "code": weather.code,
            "high": weather.high,
            "low": weather.low,
            "originalName": weatherMap[weather.code][1],
            "name": weatherMap[weather.code][2]
        };
    });
}

function getWeatherMap() {

    return Q.Promise(function (resolve, reject) {

        fs.readFile('config/weather.csv', 'utf8', function (err, csvdata) {
            if (err) {
                reject(err);
            }
            parse(csvdata, function (err, output) {
                resolve(output);
            });
        });
    });
}

function getWeatherForecast() {

    return Q.Promise(function (resolve, reject) {

        request(C.weatherUrl, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                var data = JSON.parse(response.body);
                var tomorrow = moment().add(1, 'days').format("D MMM YYYY");
                var forecasts = data.query.results.channel.item.forecast;
                var forecast = _.find(forecasts, {'date': tomorrow});

                resolve({
                    "high": forecast.high,
                    "low": forecast.low,
                    "code": forecast.code
                });
            } else {
                reject(new Error("could not get forecast "+error));
            }
        });
    });
}

module.exports = {
    getWeather: getWeather
};
