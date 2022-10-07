const express = require("express");
const prorouter = express.Router();
const Employee = require("../models/employee.model.js");
const cors = require("cors");

app.use(cors());

// login
prorouter.get("/", (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});
// Posting all data

prorouter.post("/", (req, res) => {
  let emp = new Employee({
    ename: req.body.ename,
    erole: req.body.erole,
    eemail: req.body.eemail,
    epassword: req.body.epassword,
  });
  emp.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

module.exports = prorouter;
