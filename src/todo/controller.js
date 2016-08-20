
module.exports = function createTodoController(){

    function toWireType(todo, baseUrl){
        return {
                id: todo.id,
                title: todo.title,
                order: todo.order,
                completed: todo.completed,
                url: "http://#{baseUrl}/#{todo.id}"
        }
    }

    var TodoModel = require('../todo/model');

    return {
        create: function(todo, baseUrl){
            todo.completed = false;
           // TodoModel.create(todo, function(err){
            //    if(err) throw err;
            //});
            
            return toWireType(todo,baseUrl);
        }
    };
};





    
   







// module.exports = ->

//   toWireType = (todo, baseUrl) ->
//     id: todo.id
//     title: todo.title
//     order: todo.order
//     completed: todo.completed
//     url: "http://#{baseUrl}/#{todo.id}"

//   Todo = require('../models/todo')()

//   findAll: (baseUrl) ->
//     Todo.find().exec().then (todos) -> toWireType todo,baseUrl for todo in todos

//   findById: (id, baseUrl) ->
//     Todo.findOne({'id': id}).exec().then (todo) -> toWireType todo, baseUrl

//   create: (todo, baseUrl) ->
//     todo.completed = false
//     Todo.create(todo).then (todo) -> toWireType todo, baseUrl

//   update: (id, patch, baseUrl) ->
//     Todo.findOneAndUpdate({id: id}, patch).exec().then (todo) ->
//       toWireType todo, baseUrl

//   deleteAll: -> Todo.remove().exec()

//   deleteById: (id) -> Todo.remove(id: id).exec()