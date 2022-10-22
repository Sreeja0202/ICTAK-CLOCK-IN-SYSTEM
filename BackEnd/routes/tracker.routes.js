const express = require("express");
const trackerrouter = express.Router();
const Tracker = require("../models/tracker.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

// getting all data
trackerrouter.get("/", (req, res) => {
  Tracker.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});

// posting data
trackerrouter.post("/", (req, res) => {
  let track = new Tracker({
    empmail: req.body.empmail,
    tdate: req.body.tdate,
    tproject: req.body.tproject,
    ttask: req.body.ttask,
    tmode: req.body.tmode,
    ttime: req.body.ttime,
    tdesc: req.body.tdesc,
    ttotal: req.body.ttotal,
  });
  track.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

// updating tracker
trackerrouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let emp = {
      tdate: req.body.tdate,
      tproject: req.body.tproject,
      ttask: req.body.ttask,
      tmode: req.body.tmode,
      ttime: req.body.ttime,
      tdesc: req.body.tdesc,
    };
    Tracker.findByIdAndUpdate(
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

// deleting data
trackerrouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Tracker.findByIdAndRemove(req.params.id, (err, doc) => {
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
module.exports = trackerrouter;
