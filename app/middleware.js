var jwt = require('jsonwebtoken')

var exports;

exports.jwt = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (! token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, req.app.get('supersecret'), function(err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }

        req.decoded = decoded;
        next();
    });
};

module.exports = exports;
