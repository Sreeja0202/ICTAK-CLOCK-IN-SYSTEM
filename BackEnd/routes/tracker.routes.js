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
    tdesc: req.body.tdesc,
    ttime: req.body.ttime,
  });
  track.save((err, doc) => {
    if (err) {
      console.log("Error in Posting Data", +err);
    } else {
      res.send(doc);
    }
  });
});

// getting all data
// trackerrouter.get("/", (req, res) => {
//   let userData = req.body;
//   Tracker.findOne(
//     {
//       empmail: userData.empmail,
//     },
//     (err, user) => {
//       if (user.empmail == userData.empmail) {
//         res.send(user);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

module.exports = trackerrouter;
