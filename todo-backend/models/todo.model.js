const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = mongoose.model("Todo", todoSchema);