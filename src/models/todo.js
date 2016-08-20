

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    name: String,
    completed: Boolean,
    url: String,
    order: Int16Array
});

module.exports = mongoose.model('Todo', TodoSchema);