const mongoose = require("mongoose");
const Task = mongoose.model("task", {
  tname: {
    type: String,
  },
});

module.exports = Task;
