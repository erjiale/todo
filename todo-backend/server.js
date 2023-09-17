const express = require("express");
const dotenv = require("dotenv").config(); // import and configure dotenv
const mongoose = require("mongoose");

const app = express(); // create our express backend server application
const port = 4000;

// Connect to our db;
var db = mongoose.connect(
  process.env.CONNECTION_STRING, 
  { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.send("Welcome to todo-backend server");
  });

app.listen(port, (req, res) => {
    console.log("Server is running on port: " + port);
});
