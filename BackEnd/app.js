const express = require("express");

var app = new express();

app.get("/", (req, res) => {
  app.get(res.send("Backend is working"));
});

app.listen(3000, function () {
  console.log("Server ready in  3000");
});
