const express = require("express");
var app = new express();
const cors = require("cors");
const mongoose = require("./db.js");
const emprouter = require("./routes/employee.routes.js");
const prorouter = require("./routes/project.routes.js");
const trackerrouter = require("./routes/tracker.routes.js");

app.use(express.json());
app.use(cors());

app.use("/employees", emprouter);
app.use("/projects", prorouter);
app.use("/trackers", trackerrouter);

app.listen(3000, function () {
  console.log("Server ready in  3000");
});
