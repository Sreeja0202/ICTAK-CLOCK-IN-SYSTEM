const express = require("express");
const loginRouter = express.Router();


loginRouter.get("/login", function (req, res) {
    var checkemployee = {
      ename: req.body.ename,
      pwd: req.body.pwd,
    };
  
    console.log(checkemployee);
    var flag = false;
  
    
    for (let i = 0; i < employee.length; i++) {
      if (checkemployee.ename == employee[i].ename && checkuser.pwd == employee[i].pwd) {
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
  
    console.log(flag);
  
    if (flag == true) {
      // alert("User Verified.Click to continue");
      res.redirect("/home");
    } else {
      alert("Please recheck your Login Credentials");
      
    }
  });
  
  module.exports = loginRouter;