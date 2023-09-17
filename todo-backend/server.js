const express = require("express");
const dotenv = require("dotenv").config(); // import and configure dotenv

const app = express(); // create our express backend server application
const port = 4000;

app.get("/", (req, res) => {
    res.send("Welcome to todo-backend server");
  });

app.listen(port, (req, res) => {
    console.log("Server is running on port: " + port);
});
