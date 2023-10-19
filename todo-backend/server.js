const express = require("express");
const dotenv = require("dotenv").config(); // import and configure dotenv
const mongoose = require("mongoose");

const todoRoute = require("./routes/todo.route");

const app = express(); // create our express backend server application
const port = 4000;

// Connect to our db;
mongoose.connect(
  process.env.CONNECTION_STRING, 
  { useNewUrlParser: true, useUnifiedTopology: true });

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to todo-backend server");
  });

// Routes
app.use('/api/todo', todoRoute);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
