const express = require("express");
const emprouter = express.Router();
const Employee = require("../models/employee.model.js");
const app = new express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const objectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
// bcrypt password - next modification


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
        } else if (!bcrypt.compareSync(userData.epassword, user.epassword)) {
          console.log(userData.epassword);
          console.log(user.epassword);
          res.status(401).send("Invalid Password");
        } else {
          console.log(user);
          let payload = {
            id: user._id,
            name: user.ename,
            email: user.eemail,
            // password: user.epassword,
            roles: user.erole,
            profile_picture: user.eprofile_picture
          };
          console.log(payload);
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  );
});

// Posting all data

emprouter.post("/", (req, res) => {
  var pass = req.body.epassword;
  var hash = bcrypt.hashSync(pass, 10);
  console.log(pass);
  console.log(hash);
  let emp = new Employee({
    ename: req.body.ename,
    erole: req.body.erole,
    eemail: req.body.eemail,
    epassword: hash,
  });
  emp.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

// getting all employee

emprouter.get("/", (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// get by id

emprouter.get("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in getting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with Employee with id ${req.params.id}`);
  }
});

// deleting by id
emprouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", +err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res
      .status(400)
      .send(`No record found with Employee with id ${req.params.id}`);
  }
});

// updating employee
emprouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let emp = {
      ename: req.body.ename,
      erole: req.body.erole,
      eemail: req.body.eemail,
      epassword: req.body.epassword,
    };
    Employee.findByIdAndUpdate(
      req.params.id,
      { $set: emp },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in updating data", +err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res
      .status(400)
      .send(`No record found with Employee with id ${req.params.id}`);
  }
});


module.exports = emprouter;
