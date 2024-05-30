const express = require("express");
const passport = require("passport");


let router = express.Router();

router.get("/", (req, res) => {
  if(req.user){
    res.render("tr/site/login",{login:1});

  }else{
    res.render("tr/site/login",{login:0});

  }
});


router.post("/", (req, res, next) => {
console.log(req.body)
});

module.exports = router;
