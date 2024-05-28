const express = require("express");
const passport = require("passport");

const login = require("./../../model/database/login");
let router = express.Router();

router.get("/", (req, res) => {
  if(req.user){
    res.render("tr/site/login",{login:1});

  }else{
    res.render("tr/site/login",{login:0});

  }
});


router.post("/", (req, res, next) => {
  login.loginControl(req.body.email, req.body.password).then((data) => {
    if (data == 0 || data == "0") {
      console.log("veri tabanı cevabı yanlış", data);
      res.json({respons:0});
    } else {
      console.log("veri tabanı cevabı doğru", data);

      req.login(data, (err) => {
        res.json({respons:1})
      });
    }
  });
});

module.exports = router;
