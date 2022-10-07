const express = require("express");
const prorouter = express.Router();
const Project = require("../models/project.model.js");
const cors = require("cors");
const app = new express();

app.use(cors());

// login
prorouter.get("/", (req, res) => {
  Project.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});
// Posting all data

prorouter.post("/", (req, res) => {
  let pro = new Project({
    pname: req.body.pname,
    pcategory: req.body.pcategory,
  });
  pro.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

module.exports = prorouter;
