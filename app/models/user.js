var mongoose   = require('mongoose')
var Schema   = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: Schema.ObjectId,
    name: String,
    password: String,
}, {timestamps: true}));

