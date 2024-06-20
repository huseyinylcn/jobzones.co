let express = require("express");
let router = express.Router();
let { userGET } = require("../../model/user/get");
let { jobapplicationADD } = require("../../model/job/jobapplication");
let { jobGETfUnch } = require("../../model/job/jobGET");
let { mailSend } = require("../../model/notification/jobMail");

let info = {
  username: "",
  userID: "",
  jobID: "",
  cvpath: "",
  status: 0,
};

router.post("/mail",(req,res,next)=>{
    try {
        jobGETfUnch(req.body.jobID)
        .then((data) => {
          req.jobINFO = data;
          next()
        })
        .catch((err) => {
          res.json({ result: 0, message: `joget error ${err}` });
        });
        
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})

router.post("/mail",(req,res,next)=>{
    try {
       
        res.json(req.jobINFO)
        
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})




router.post("/", (req, res, next) => {
  try {
    if (req.user) next();
    else res.json({ result: 0, message: "kullaıcı giriş yapmamış" });
  } catch (error) {
    res.json({ result: 0, message: "system error 1" });
  }
});

router.post("/", (req, res, next) => {
    try {
      jobGETfUnch(req.body.jobID)
        .then((data) => {
          req.jobINFO = data;
          next();
        })
        .catch((err) => {
          res.json({ result: 0, message: `joget error ${err}` });
        });
    } catch (error) {
      res.json({ result: 0, message: "system error 2" });
    }
  });


router.post("/", (req, res, next) => {
  try {
    userGET(req.user)
      .then((data) => {
        info.userID = req.user;
        info.username = data.username;
        info.jobID = req.body.jobID;
        info.cvpath = req.body.cvpath;
        info.message = req.body.message;
        req.userInfo = data;
        next();
      })
      .catch((err) => {
        res.json({
          resul: 0,
          message: "kullanıcı verilerini sql vermedi kız biraz ona",
        });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 2" });
  }
});

router.post("/", (req, res, next) => {
  try {
    jobapplicationADD(info)
      .then((data) => {
        if (data == 0)
          res.json({
            resul: 0,
            message: "iş iş ilanı kayıt edilemedi malesef :(",
          });
        else next();
      })
      .catch((err) => {
        res.json({
          resul: 0,
          message:
            "iş iş ilanı kayıt edilemedi malesef  sql bize yanlış yaptı :(",
        });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 2" });
  }
});



router.post("/", (req, res, next) => {
  try {

    let veri = {
      mail: req.jobINFO[0].email,
      title:`${req.jobINFO[0].title} İş başvurusu`,
      message: ` 
          <html >
<div style="text-align: center; font-family: sans-serif; width: 100%; max-width: 400px; min-height: 400px; border: 1px solid black; margin: auto; margin-top: 20px;">
    <h3>Yeni bir başvurunuz var</h3>
    <img width="200px"  src="http://admin.tarihiyazilar.com/img/MezarFotograf/53b80d39a75cbe1cb06ffbfd830916078acff06452007a79da91bc4bb87e6156.jpeg" alt="gelmedi http://localhost:3000${req.userInfo.profileIMG}">
    <p >${req.userInfo.fullname} iş başvurusunda bulundu <a href="http://localhost:3000/${req.userInfo.username}">Linke</a> tıklayarak inceleyebilirsiniz</p>
</div>
</html>`,
    };
    mailSend(veri)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ result: 0, message: `mail error ${err}` });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 3" });
  }
});

module.exports = router;
