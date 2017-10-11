var User = require('../models').user
var jwt = require('jsonwebtoken')

var exports;

exports.register = function(req, res) {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
    });

    user.save(function(err) {
        if (err) throw err;

        console.log('New user record saved to database');

        res.json({ success: true });
    });
};

exports.authenticate = function(req, res) {
    User.findOne({ name: req.body.name }, function(err, user) {
        if (err) throw err;

        if (! user) {
            res.json({
                success: false,
                message: 'Authentication failed, user not found.'
            });
        }

        if (user.password != req.body.password) {
            res.json({
                success: false,
                message: 'Authentication failed, incorrect password.'
            });
        }

        var token = jwt.sign({ user: user }, req.app.secret);

        res.json({ success: true, message: token });
    });
};

module.exports = exports;
