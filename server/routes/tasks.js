const router = require("express").Router();
const middleware = require("../middlewares/middleware");
const getEmail = require("../utils/jwt-util");
const Task = require("../models/task");

// Display all tasks
router.get('/tasks/', middleware, async (req,res) => {
    const email = getEmail(req.cookies.token);
    const tasks = await Task.find({
      email: email,
    });
    res.send({
        tasks : tasks
    });
});

// Add task
router.post('/tasks/new', middleware, async (req,res) => {
    const email = getEmail(req.cookies.token);
    await Task.create(
        {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            email : email
        }
    );
    res.send({
        status : "Added Task Successfully"
    });
});

// Edit task
router.put("/tasks/update/:id", middleware, async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.params.id }, 
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
        },
      } 
    );
    res.send({
      status: "Updated Task Successfully",
    });
  } catch (err) {
    res.status(500).send({
      error: "There was a problem updating the task.",
    });
  }
});


// Delete task
router.delete('/tasks/delete/:id', middleware, async (req,res) => {
    await Task.deleteOne({
        _id : req.params.id
    });
    res.send({
      status: "Deleted Task Successfully",
    });
});


module.exports = router;