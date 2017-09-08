const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/recipes_db')

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    id: Schema.ObjectId,
    slug: String,
    name: String,
    ingredients: {type: Array, "default": []},
    description: String,
}, {timestamps: true})

var Recipe = mongoose.model('Recipe', RecipeSchema);

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

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
