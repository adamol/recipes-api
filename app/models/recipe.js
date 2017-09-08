var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Recipe', new Schema({
    id: Schema.ObjectId,
    slug: String,
    name: String,
    ingredients: {type: Array, "default": []},
    description: String,
}, {timestamps: true}));
