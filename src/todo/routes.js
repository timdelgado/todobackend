
var express = require('express');
var router = express.Router();

var controller = require('../todo/controller');

router.post('/', function(req,res){
    controller.create(req.body, req.get('host'));//.then(function (todo){ return res.json(todo);})
});

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function(req, res) {
  res.send('hello world');
});

module.exports = router;
