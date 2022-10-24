const express = require("express");
var app = new express();
const cors = require("cors");
const mongoose = require("./db.js");
const emprouter = require("./routes/employee.routes.js");
const prorouter = require("./routes/project.routes.js");
const trackerrouter = require("./routes/tracker.routes.js");
const taskrouter = require("./routes/tasks.routes.js");
const filterrouter = require("./routes/filters.route.js");
const path = require('path');
const objectId = require("mongoose").Types.ObjectId;
const Employee = require("./models/employee.model.js");



const multer = require("multer");
app.use(express.static(path.join("public")));

var storage = multer.diskStorage({

  destination: function(request, file, callback){
    callback(null, './public/uploads')
  },

  filename : function(request, file, callback){
    console.log(file);
    callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})


const upload = multer({storage: storage})

app.use(express.json());
app.use(cors());

app.use(express.static('./dist/frontend'));

app.use("/employees", emprouter);
app.use("/projects", prorouter);
app.use("/trackers", trackerrouter);
app.use("/tasks", taskrouter);
app.use("/filters", filterrouter);

app.get('/*',  function(req, res) {
  res.sendFile(path.join(__dirname + '/dist//frontend/index.html'));
 });
 

 //upload image


app.post('/uploadimage/:id', upload.single('profile_picture'), (request, response)=>{
  console.log("below is file");
  console.log(request.file);

      if (objectId.isValid(request.params.id)) {
        let emp = {
          eprofile_picture: `/uploads/${request.file.filename}`,
        };
        Employee.findByIdAndUpdate(
          request.params.id,
          { $set: emp },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("Error in updating data", +err);
            } else {
              response.send(doc);
            }
          }
        );
      } else {
        return response
          .status(400)
          .send(`No record found with Employee with id ${request.params.id}`);
      }
})

app.listen(3000, function () {
  console.log("Server ready in  3000");
});
