const mongoose = require("mongoose");
const Employee = mongoose.model("employee", {
  ename: {
    type: String,
  },
  erole: {
    type: String,
  },
  eemail: {
    type: String,
  },
  epassword: {
    type: String,
  },
});

module.exports = Employee;
