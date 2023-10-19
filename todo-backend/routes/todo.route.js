const express = require("express");
const router = express.Router(); // use express.Router() class to create our route handler system

const TodoSchema = require("../models/todo.model");

// GET todos

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
