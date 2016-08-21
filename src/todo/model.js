


var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://192.168.99.100:27017/todos");
//autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var todoItemSchema   = new Schema({
    name: String,
    completed: Boolean,
    order: Number
});


//todoItemSchema.plugin(autoIncrement.plugin, {model: 'Todo', field: 'id'});

module.exports = mongoose.model('Todo', todoItemSchema);

