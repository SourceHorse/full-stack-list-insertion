var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var List = mongoose.model('List');

router.get('/lists', function(req, res, next) {
  List.find(function(err, lists){
    if(err){ return next(err); }

    res.json(lists);
  });
});

router.post('/lists', function(req, res, next) {
  var list = new List(req.body);

  list.save(function(err, list){
    if(err){ return next(err); }

    res.json(list);
  });
});

router.param('list', function(req, res, next, id) {
  var query = List.findById(id);

  query.exec(function (err, list){
    if (err) { return next(err); }
    if (!list) { return next(new Error('can\'t find list')); }

    req.list = list;
    return next();
  });
});

router.get('/lists/:list', function(req, res) {
  res.json(req.list);
});

module.exports = router;
