
var express = require('express');
var router = express.Router();

var controller = require('./controller')();

function getUrl(req){
  return req.protocol + '://' + req.get('host') + '/api/todos';
}

router.post('/', function(req,res){
    var result = controller.create(req.body, getUrl(req));
    return res.json(result);
});

// return all todo items
router.get('/', function(req, res) {
    var result = controller.getAll(getUrl(req));
    return res.json(result);
});

module.exports = router;
