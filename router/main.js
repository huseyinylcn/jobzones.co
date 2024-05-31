const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/home/");
});

router.get("/home", (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("tr/site/Home-02", { login: 0 });
  }
});
router.use("/home", (req, res, next) => {
    res.render("tr/site/Home-02", { login: 0 });

});

module.exports = router;
