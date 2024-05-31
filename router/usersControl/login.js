const express = require("express");
const passport = require("passport");
let { login } = require("../../model/user/control");

let router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.render("tr/site/login", { login: 1 });
  } else {
    res.render("tr/site/login", { login: 0 });
  }
});

router.post("/", (req, res, next) => {
  try {
    login(req.body)
      .then((data) => {
        if (data == 0)
          res.json({ result: 0, message: "kullanıcı adı veya şifre yanlış" });
        else {
          req.login(data, (err) => {
            if (err) res.json({ result: 0, message: "System Error" });
            else next();
          });
        }
      })
      .catch((err) => {
        res.json({ result: 0, message: "System Error" });
      });
  } catch (error) {
    res.json({ result: 0, message: "System Error" });
  }
});

router.post("/", (req, res, next) => {
  try {
    res.json({ result: 1, message: `Successfull, ${req.user}` });
  } catch (error) {
    res.json({ result: 0, message: "System Error" });
  }

});

module.exports = router;
