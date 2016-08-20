
var express = require('express');
var router = express.Router();

var controller = require('./controller')();

router.post('/', function(req,res){
    var result= controller.create(req.body, req.get('host'));
    return res.json(result);
});

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function(req, res) {
  res.send('hello world');
});

module.exports = router;
