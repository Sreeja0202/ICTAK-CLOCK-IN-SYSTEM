const mongoose = require("mongoose");
const Tracker = mongoose.model("tracker", {
  tdate: {
    type: String,
  },
  tproject: {
    type: String,
  },
  ttask: {
    type: String,
  },
  tmode: {
    type: String,
  },
  tdesc: {
    type: String,
  },
  ttime: {
    type: String,
  },
});

module.exports = Tracker;
