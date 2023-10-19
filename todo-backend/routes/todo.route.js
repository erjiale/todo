const express = require("express");
const router = express.Router(); // use express.Router() class to create our route handler system

const TodoSchema = require("../models/todo.model");

// GET todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await TodoSchema.find();

    return res.json(allTodos);
  }
  catch(err) {
    console.log(err);
    
    return res.status(500).json({ error: "Internal error retrieving all todos" });
  }
});

// GET todo by Id
router.get("/:id", async (req, res) => {
  try {
    const todo = await TodoSchema.findById(req.params.id);

    if (todo === null) {
      return res.status(404).json({ error: `todo with id ${req.params.id} was not found`})
    }

    return res.json(todo);
  }
  catch(err) {
    return res.json(500).json({ error: `Internal server error when retrieving todo ${req.params.id}` });
  }
});

// CREATE todo
router.post("/", async (req, res) => {
  if (!req.body.description) {
    return res.status(400).json({ error: "Todo description cannot be empty "});
  }

  const todo = new TodoSchema({
    description: req.body.description
  });

  try {
    const createTodo = await todo.save();

    return res.json(createTodo);
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error; could not save todo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await TodoSchema.findByIdAndDelete({
      _id: todoId
    });

    if (!todo) {
      return res.status(404).json({ error: `Could not find todo ${todo}` });
    }

    return res.json(`Todo was successfully deleted - ${todoId} - ${todo.description}`);

  }
  catch(err) {
    return res.status(500).json({ error: "Internal Server Error: could not delete todo" });
  }
});

// UPDATE todo
router.put("/:id", async (req, res) => {
  const todoId = req.params.id;
  
  try {
    if (!req.body.description) {
      return res.status(400).json({ error: "Todo Description must not be empty" });
    }

    const filter = { _id: todoId };
    const updatedData = { description: req.body.description };

    await TodoSchema.findByIdAndUpdate(filter, updatedData);

    return res.json(`${todoId} has been succesfully updated to ${req.body.description}`);
  }
  catch(err) {
    return res.status(500).json({ error: "Internal Server Error: could not update todo" });
  }
});

// UPDATE todo to complete/incomplete
router.put("/:id/complete", async (req, res) => {
  const todoId = req.params.id;
  
  try {
    const filter = { _id: todoId };

    let todo = await TodoSchema.findById(filter);

    const updatedData = { isCompleted: !todo.isCompleted };

    await TodoSchema.updateOne(filter, updatedData);

    return res.json(`${todoId} has been succesfully updated to ${!todo.isCompleted}`);
  }
  catch(err) {
    return res.status(500).json({ error: "Internal Server Error: could not update todo" });
  }
});

module.exports = router; // export our router module system so other components can import this
