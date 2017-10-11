var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var exports;

exports.recipe = mongoose.model('Recipe', new Schema({
    id: Schema.ObjectId,
    slug: String,
    name: String,
    ingredients: {type: Array, "default": []},
    description: String,
}, {timestamps: true}));

exports.user = mongoose.model('User', new Schema({
    id: Schema.ObjectId,
    name: String,
    password: String,
}, {timestamps: true}));

module.exports = exports;
