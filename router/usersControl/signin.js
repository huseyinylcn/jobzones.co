const express = require("express");
const crypto = require("crypto");
const passport = require("passport");

let router = express.Router();

let mailControl = require("../../model/database/mailControl");
let addUser = require("../../model/database/addUser");
let usernameControl = require("../../model/database/usernameControl");

let verifi = require("../../model/mail/verifi");
const { profile } = require("console");

function generateRandomNumber() {
  // 100000 ile 999999 arasında rastgele bir tamsayı üret
  return Math.floor(100000 + Math.random() * 900000);
}
let generateRandomToken = (length) => {
  const token = crypto.randomBytes(length).toString("hex");
  return token;
};

router.get("/", (req, res) => {
  if(req.user){
    res.render("tr/site/create-account",{login:1});
  }else{
    res.render("tr/site/create-account",{login:0});

  }
});

router.post("/verify", (req, res) => {
  mailControl.mailControlFunc(req.body.email).then((data) => {
    if (data) {
      res.json({ id: 1 });
    } else {
      usernameControl
        .usernameControlFunc(req.body.username)
        .then((userValue) => {
          if (userValue) {
            res.json({ id: 2 });
          } else {
            let code = generateRandomNumber();
            console.log(code)
            verifi.verifiFunc(code, req.body.email).then((datasend) => {
              if (datasend) {
                res.json({ id: code });
              } else {
              }
            });
          }
        });
    }
  });
});

router.post("/", (req, res, next) => {
  let token = generateRandomToken(20);

  addUser
    .addUserFunc(
      token,
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.typeID,
      req.body.fullname
    )
    .then((data) => {
      if (data) {
        req.login(token, () => {
if(req.body.typeID){
  res.json({ path: "/infoplusemployer" });
}else{
  res.json({ path: "/infoplus" });
}

        });
      } else {
        res.json({ path: "/signin/" });
      }
    });
});

router.get("/google/", (req, res, next) => {
  // Log the query parameters
  req.session.query = req.query;

  // Continue with Passport authentication
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })(req, res, next);
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {

  if(req.userStatus == 0){
    res.redirect("/");
  }else{
    if(req.employer == 1){
      res.redirect('/infoplusemployer')
    }else{
      res.redirect("/infoplus");
    }
    
  }

  
});

module.exports = router;
