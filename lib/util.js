var moment = require('moment');

function stampTime(obj) {
    obj.updated = moment().format("X");
    return obj;
}

function timestamp() {
    return moment().format("X");
}

module.exports = {
    stampTime: stampTime,
    timestamp: timestamp
};
