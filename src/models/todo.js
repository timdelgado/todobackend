// src/models/todo.js


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    name: String,
    completed: Boolean,
    order: Number
});

module.exports = mongoose.model('Todo', TodoSchema);
