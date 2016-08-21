// src/models/todo.js


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    title: String,
    completed: Boolean,
    order: Number
});

module.exports = mongoose.model('Todo', TodoSchema);
