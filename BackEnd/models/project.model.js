const mongoose = require("mongoose");
const Project = mongoose.model("project", {
  pname: {
    type: String,
  },
  pcategory: {
    type: String,
  },
});

module.exports = Project;
