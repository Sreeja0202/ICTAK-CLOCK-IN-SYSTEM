const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Anujpillai:cgnBHQjte1A7C6qZ@cluster0.9yprpll.mongodb.net/clockinDB",
  (err) => {
    if (!err) {
      console.log("DB connection successfully established!!!");
    } else {
      console.log("Error in connection", +err);
    }
  }
);

module.exports = mongoose;
