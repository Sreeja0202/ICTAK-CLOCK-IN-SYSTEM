const mongoose = require("mongoose");
const Filter = mongoose.model("filter", {
  fproject: {
    type: String,
  },
  ftask: {
    type: String,
  },
  fperiod: {
    type: String,
  },
});

module.exports = Filter;
