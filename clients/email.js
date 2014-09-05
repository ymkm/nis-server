var Q = require('q');
var _ = require('lodash');
var Imap = require('imap');
var C = require('../config/config.json');

function getUnreadCount() {

    return Q.Promise(function (resolve, reject) {

        var imap = new Imap({
            user: C.emailUsername,
            password: C.emailPassword,
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });

        imap.connect();
        imap.once('ready', function () {
            imap.status("INBOX", function (err, box) {
                if (err) throw reject(err);
                var count = box.messages.unseen;
                imap.end();
                resolve(count);
            }, 2000);

        });

        // must include this -  https://github.com/mscdex/node-imap/issues/303
        imap.on('error', function (err) {
            // will be ECONNRESET - we don't care
        });
    });
}

module.exports = {
    getUnreadCount: getUnreadCount
};
