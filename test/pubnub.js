var C = require('../config/config.json');
var pubnub = require('../clients/pubnub.js');

console.log(pubnub.publish(C.key.email, {"count": 5}));
