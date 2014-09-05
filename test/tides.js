var data = require("../test/data/tides.json");
var tides = require('../clients/tides.js');

console.log(tides.calculateCurrent(tides.format(data)));



