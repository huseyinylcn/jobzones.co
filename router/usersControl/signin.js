const express = require("express");
const crypto = require("crypto");
const passport = require("passport");
let router = express.Router();

let { conrolUSER } = require("./../../model/user/control");
let { mailSend } = require("./../../model/user/mail");
let { record,recordCandidatesInfoFUNC } = require("./../../model/user/record");




let user = {
  userID:'',
  username: "",
  email: "",
  password: "",
  type:'',
  mailCode: "",
};

let generateRandomToken = (length) => {
  const token = crypto.randomBytes(length).toString("hex");
  return token;
};


router.get("/google/", (req, res, next) => {
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
  if (req.userStatus == 0) {
    res.redirect("/");
  } else {
    if (req.employer == 1) {
      res.redirect("/infoplusemployer");
    } else {
      res.redirect("/infoplus");
    }
  }
});


router.get("/", (req, res) => {
  if (req.user) {
    res.render("tr/site/create-account",{login:0});
  } else {
    res.render("tr/site/create-account",{login:0});
  }
});


router.post("/verify", (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});

router.post("/verify", (req, res, next) => {
  try {
    if (user.mailCode != req.body.code)
      res.json({ result: 0, message: "code hatalı" });
    else next();
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});

router.post("/verify", (req, res, next) => {
  try {
    record(user).then(data=>{
      if(data == 1) next()
      else res.json({result:0,message:'Kayıt Başarısız Oldu System Error'})
    }).catch((err)=>{
      res.json({result:0,message:`Kayıt Başarısız Oldu System Error ${err}`})
    })

  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});

router.post('/verify',(req,res,next)=>{
  try {
    recordCandidatesInfoFUNC(user.userID).then(data=>{
      if(data == 1) next()
      else res.json({result:0,message:'info table create error'})
    }).catch(err=>{
      res.json({result:0,message:`info tble error ${err}`})
    })
    
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
})

router.post('/verify',(req,res,next)=>{
  req.login(user.userID,(err)=>{
    if(err) res.json({ result: 404, message: "Oturum Açılamadı" });
    else res.json('succes function!!')
  })
  
})

router.post("/", (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});

router.post("/", (req, res, next) => {
  try {
    conrolUSER(req.body.username, req.body.email)
      .then((result) => {
        if (result == 1) {
          next();
        } else if (result == 2) {
          res.json({ result: 0, message: "mail adresi kullanılmış" });
        } else if (result == 3) {
          res.json({ result: 0, message: "username kullanılmış" });
        } else if (result == 4) {
          res.json({ result: 0, message: "mail ve username kullanılmış" });
        } else {
          res.json({ result: 0, message: "Tanımlanmayan Hata" });
        }
      })
      .catch((err) => {
        res.json({ result: 0, message: "veri tabanı Hata" });
      });
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});

router.post("/", (req, res, next) => {
  try {
    let verificationCode = Math.floor(1000 + Math.random() * 9000);
    console.log(verificationCode);
    mailSend(verificationCode, req.body.email).then((data) => {
      if (data == 1) {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.userID = generateRandomToken(30)
        user.type = req.body.type
        user.mailCode = verificationCode;
        res.json({
          result: 1,
          message: "Doğrulma Kodunu Post olarak göndermeniz gerekecek",
        });
      } else if (data == 0) {
        res.json({ result: 0, message: "Mail Error" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ result: 404, message: " İstek Hatalı" });
  }
});



module.exports = router;
