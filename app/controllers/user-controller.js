var User = require('../models').user

var exports;

exports.index = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
}

module.exports = exports;
