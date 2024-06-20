const express = require("express");
let router = express.Router();
let { employerGET, userGET } = require("../model/user/get");
let { userTypeControl } = require("../model/user/control");

router.get("/", (req, res) => {
  res.redirect("/home/");
});

router.get("/home", (req, res, next) => {
  try {
    if (req.user) {
      next();
    } else {
      res.render("tr/site/Home-02", { login: 0 });
    }
  } catch (error) {
    res.json({ result: 0, message: "system error 1" });
  }
});

router.use("/home", (req, res, next) => {
  try {
    userTypeControl(req.user)
      .then((data) => {
        req.type = data;
        next();
      })
      .catch((err) => {
        res.json({ result: 0, message: "type control error" });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 2" });
  }
});

router.get("/home", (req, res, next) => {
  try {
    if (req.type == 'false' ||req.type == false) {

      userGET(req.user).then((data) => {
        res.render("tr/site/Home-02", { login: 1,userData: data});
      }).catch((err)=>{
        res.json({ result: 0, message: "userGET Error" });
      })
    } else {

      employerGET(req.user).then((data) => {
        res.render("tr/site/Home-02", { login: 1,userData: data});
      }).catch((err)=>{
        res.json({ result: 0, message: "employerGET Error" });
      })
    }
  } catch (error) {
    res.json({ result: 0, message: "system error 3" });
  }
});

router.get("/faqs", (req, res) => {
  res.render("tr/site/accordion-page", { login: 0 });
});

module.exports = router;
