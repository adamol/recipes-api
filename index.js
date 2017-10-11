var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var config = require('./config')

// configuration
var port = process.env.PORT || 3000;
mongoose.connect(config.database)
app.set('supersecret', config.secret);

// set up bodyParser to read POST requests and URL params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests
app.use(morgan('dev'))

app.get('/', function(req, res) {
    res.send('Hello World')
})

var authController = require('./app/controllers/auth-controller');
app.post('/register', authController.register);
app.post('/authenticate', authController.authenticate);

var recipeController = require('./app/controllers/recipe-controller');
app.get('/recipes', recipeController.index);
app.get('/recipes/:slug', recipeController.show);
app.post('/recipes', recipeController.store);

var mw = require('./app/middleware');
app.use('/api', mw.jwt);

var userController = require('./app/controllers/user-controller');
app.get('/api/users', userController.index);

app.listen(port, function() {
    console.log('App listening on port ' + port)
});

