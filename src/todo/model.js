

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://192.168.99.100:27017/todo");
autoIncrement.initialize(connection);


var todoItemSchema   = new Schema({
    name: String,
    completed: Boolean,
    order: Number
});

todoItemSchema.plugin(autoIncrement.plugin, {model: 'Todo', field: 'id'});

module.exports = mongoose.model('Todo', todoItemSchema);

