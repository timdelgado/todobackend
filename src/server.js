// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:27017/tdelgado');

var Todo     = require('./models/todo');


function toWireType(todo, req){
    return {
            id: todo.id,
            title: todo.title,
            order: todo.order,
            completed: todo.completed,
            url: req.protocol + '://' + req.get('host') + '/api/todos/'  + todo.id
    }
}


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// on routes that end in /todos
// ----------------------------------------------------
router.route('/todos')

    // create a todo (accessed at POST http://localhost:8080/api/todos)
    .post(function(req, res) {
        
        var todo = new Todo();      // create a new instance of the Todo model
        todo.title = req.body.title;  // set the todo values  (comes from the request)
        todo.completed = req.body.completed;
        todo.order = req.body.order;

        // save the bear and check for errors
        todo.save(function(err) {
            if (err)
                res.send(err);

            res.json(toWireType(todo,req));
        });
        
    })

    // get all the todos (accessed at GET http://localhost:8080/api/todos)
    .get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);

            var toSend = todos.map(function(todo){ 
                return toWireType(todo,req);
            });    

            res.json(toSend);
        });
    });

// on routes that end in /todos/:todo_id
// ----------------------------------------------------
router.route('/todos/:todo_id')

    // get the todo with that id (accessed at GET http://localhost:8080/api/todo/:todo_id)
    .get(function(req, res) {
        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            
            res.json(toWireType(todo,req));
        });
    })

    // update the todo with this id (accessed at PUT http://localhost:8080/api/todo/:todo_id)
    .put(function(req, res) {

        // use our todo model to find the todo we want
        Todo.findById(req.params.todo_id, function(err, todo) {

            if (err)
                res.send(err);

            todo.title = req.body.title;  // set the todo values  (comes from the request)
            todo.completed = req.body.completed;
            todo.order = req.body.order;

            // save the bear
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json(toWireType(todo,req));
            });

        });
    })
    // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
    .delete(function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            res.json(toWireType(todo,req));
        });
    });
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(Number(process.env.PORT || 8080));



