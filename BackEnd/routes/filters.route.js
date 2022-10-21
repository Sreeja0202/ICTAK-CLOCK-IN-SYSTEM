const express = require("express");
const filterrouter = express.Router();
const Filter = require("../models/filter.model.js");
const cors = require("cors");
const app = new express();
const objectId = require("mongoose").Types.ObjectId;
app.use(cors());

filterrouter.get("/", (req, res) => {
  Filter.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", +err);
    } else {
      res.send(doc);
    }
  });
});
// Posting all data

filterrouter.post("/", (req, res) => {
  let filter = new Filter({
    fproject: req.body.fproject,
    ftask: req.body.ftask,
    fperiod: req.body.fperiod,
  });
  filter.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

//delete
filterrouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Filter.findByIdAndRemove(req.params.id, (err, doc) => {
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
filterrouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let filter = {
      fproject: req.body.fproject,
      ftask: req.body.ftask,
      fperiod: req.body.fperiod,
    };
    Filter.findByIdAndUpdate(
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

module.exports = filterrouter;
