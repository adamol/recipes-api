var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var config = require('./config')
var port = process.env.PORT || 3000;

mongoose.connect(config.database)
app.set('supersecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use('/', require('./app/routes'));

app.listen(port, function() {
    console.log('App listening on port ' + port)
});

module.exports = app; // for testing

