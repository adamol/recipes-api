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

var AuthController = require('./app/controllers/AuthController');
app.post('/register', AuthController.register);
app.post('/authenticate', AuthController.authenticate);

var RecipeController = require('./app/controllers/RecipeController');
app.get('/recipes', RecipeController.index);
app.get('/recipes/:slug', RecipeController.show);
app.post('/recipes', RecipeController.store);

var mw = require('./app/middleware');
app.use('/api', mw.jwt);

var UserController = require('./app/controllers/UserController');
app.get('/api/users', UserController.index);

app.listen(port, function() {
    console.log('App listening on port ' + port)
})

