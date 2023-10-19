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


// UPDATE todo

module.exports = router; // export our router module system so other components can import this
