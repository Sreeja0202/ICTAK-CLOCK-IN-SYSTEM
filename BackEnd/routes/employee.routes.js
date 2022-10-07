const express = require("express");
const emprouter = express.Router();
const Employee = require("../models/employee.model.js");
const app = new express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());

// login
emprouter.post("/login", (req, res) => {
  let userData = req.body;
  Employee.findOne(
    {
      eemail: userData.eemail,
    },
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (user.epassword !== userData.epassword) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  );
});

// Posting all data

emprouter.post("/", (req, res) => {
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

module.exports = emprouter;
