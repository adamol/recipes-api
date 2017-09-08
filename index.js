var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var jwt = require('jsonwebtoken')
var config = require('./config')

var User = require('./app/models/user')
var Recipe = require('./app/models/recipe')

// configuration
var port = process.env.PORT || 3000;
mongoose.connect(config.database)
app.set('supersecret', config.secret);

// set up bodyParser to read POST requests and URL params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests
app.use(morgan('dev'))

// ==================================
// ===== routes =====================
// ==================================
app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/recipes', function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) res.send(err);

        res.json(recipes)
    });
})

app.get('/recipes/:slug', function(req, res) {
    Recipe.find({slug: req.params.slug}, function(err, recipes) {
        if (err) res.send(err);

        res.json(recipes)
    });
})

app.post('/recipes', function(req, res) {
    var recipe = new Recipe();

    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.description = req.body.description;

    recipe.slug = req.body.name.split(/(?=[A-Z])/).join('_').toLowerCase();

    recipe.save(function(err) {
        if (err) res.send(err);

        res.json({message: 'Recipe inserted into database'});
    });
})

app.listen(port, function() {
    console.log('App listening on port ' + port)
})
