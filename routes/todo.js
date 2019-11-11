var express = require('express');
var router = express.Router();


//placeholders for added task
var tasks = [{ done: true, name: "Study AWS" }, { done: false, name: "Learn NodeJS" }];

//post route for adding new task
router.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route
  tasks.push({ name: newTask, done: false });
  res.redirect("/todo");
});

router.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].name === completeTask) {
      tasks[i].done = true;
    }
  }
  res.redirect("/todo");
});

//render the ejs and display tasks
router.get("/", function (req, res) {
  res.render("todo", { tasks: tasks });
});

router.get("/tasks", function (req, res) {
  res.send({ tasks: tasks });
});

module.exports = router;
