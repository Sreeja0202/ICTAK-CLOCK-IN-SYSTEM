const express = require("express");
const prorouter = express.Router();
const Project = require("../models/project.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

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
  });
  pro.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

//delete
prorouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Project.findByIdAndRemove(req.params.id, (err, doc) => {
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
prorouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let pro = {
      pname: req.body.pname,
    };
    Project.findByIdAndUpdate(
      req.params.id,
      { $set: pro },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in updating Data", +err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res
      .status(400)
      .send(`No record found with Project with id ${req.params.id}`);
  }
});

module.exports = prorouter;
