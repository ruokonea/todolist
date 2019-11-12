var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');

// connect to mongodb database

mongoose.connect('mongodb+srv://user:pwd@cluster0-dpz5a.mongodb.net/test?retryWrites=true&w=majority');

// set schema

var todoSchema = new mongoose.Schema({
  name: String,
  done: Boolean
});

// set collection with schema made
var Todo = mongoose.model('todocollection', todoSchema);

router.get('/', function (req, res) {
  Todo.find({}, function (err, data) {
    if (err) throw err;
    console.log(data);
    res.render("todomongo", { tasks: data });
  })
});

router.post('/addtask', function (req, res) {
  var newTask = req.body.newtask;
  var todo = { name: newTask, done: false };
  Todo(todo).save(function (err, data) {
    if (err) throw err;
    res.redirect("/todomongo");
  })
});

router.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  Todo.find({ name: completeTask}).remove(function (err, data) {
    if (err) throw err;
    res.redirect("/todomongo");
  });
});

module.exports = router;
