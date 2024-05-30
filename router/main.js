const express = require("express");
let router = express.Router();



router.get("/", (req, res) => {
  res.redirect("/home/");
});

router.get("/home", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      res.render("tr/site/Home-02", { login: 1, data: data });
    });
  } else {
    res.render("tr/site/Home-02", { login: 0 });
  }
});


router.get("/faqs", (req, res) => {

    res.render("tr/site/accordion-page", { login: 0 });
 
});


module.exports = router;
