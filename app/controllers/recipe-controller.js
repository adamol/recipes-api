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
    Recipe.findOne({'slug': req.params.slug}, function(err, recipe) {
        if (err) res.send(err);

        res.json(recipe)
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

        res.json({message: 'Recipe successfully saved!', recipe});
    });
};

exports.update = function(req, res) {
    Recipe.findOne({'slug': req.params.slug}, function(err, recipe) {
        if (err) res.send(err);

        Object.assign(recipe, req.body).save((err, recipe) => {
            if (err) res.send(err);
            res.json({ message: 'Recipe successfully updated!', recipe });
        });
    });
};

exports.destroy = function(req, res) {
    Recipe.remove({ slug:  req.params.slug }, (err, _) => {
        res.json({ message: 'Recipe successfully deleted!' });
    });
};

module.exports = exports;
