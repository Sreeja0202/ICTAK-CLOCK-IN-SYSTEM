const express = require("express");
const taskrouter = express.Router();
const Task = require("../models/tasks.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

taskrouter.get("/", (req, res) => {
  Task.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});
// Posting all data

taskrouter.post("/", (req, res) => {
  let task = new Task({
    tname: req.body.tname,
  });
  task.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

//delete
taskrouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
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
taskrouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let task = {
      tname: req.body.tname,
    };
    Task.findByIdAndUpdate(
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

module.exports = taskrouter;
