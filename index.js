//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var tasks = [{ done: true, name: "Study AWS" }, { done: false, name: "Learn NodeJS" }];

//post route for adding new task 
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    tasks.push({ name: newTask, done: false });
    res.redirect("/");
});

app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name === completeTask) {
            tasks[i].done = true;
        }
    }
    res.redirect("/");
});

//render the ejs and display tasks
app.get("/", function (req, res) {
    res.render("index", { tasks: tasks });
});

//set app to listen on port 3000
app.listen(3000, function () {
    console.log("server is running on port 3000");
});