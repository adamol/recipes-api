var Recipe = require('../models').recipe

var exports;

exports.index = function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            res.send(err);
        }

        res.json(recipes)
    });
};

exports.show = function(req, res) {
    Recipe.find({slug: req.params.slug}, function(err, recipes) {
        if (err) res.send(err);

        res.json(recipes)
    });
};

exports.store = function(req, res) {
    var recipe = new Recipe();

    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.description = req.body.description;

    recipe.slug = req.body.name.split(/(?=[A-Z])/).join('_').toLowerCase();

    recipe.save(function(err) {
        if (err) res.send(err);

        res.json({message: 'Recipe inserted into database'});
    });
};

module.exports = exports;
