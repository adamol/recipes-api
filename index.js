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
// ==================================
// ===== auth routes ================
// ==================================
app.post('/register', function(req, res) {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
    });

    user.save(function(err) {
        if (err) throw err;

        console.log('New user record saved to database');

        res.json({ success: true });
    });
});

app.post('/authenticate', function(req, res) {
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

        var token = jwt.sign({ user: user }, app.get('supersecret'));

        res.json({ success: true, message: token });
    });
});

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (! token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, app.get('supersecret'), function(err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }

        req.decoded = decoded;
        next();
    });
});

app.use('/api', apiRoutes);

app.get('/api/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// ==================================
// ===== recipe routes ==============
// ==================================
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
