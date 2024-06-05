let express = require("express");

let router = express.Router();

let crypto = require('crypto')

let { push } = require('../../model/job/jobadvert')


let generateRandomToken = (length) => {
  const token = crypto.randomBytes(length).toString("hex");
  return token;
};



let info = {
  title: "iş ilanı",
  requirements: "gereksinimler olacak burda ",
  obligations: "yükümlülükler olacak burada",
  personalnumber: "bu iş için alıncak kişi sayısı",
  finish: "2024-12-12",
  gender: 2,
  qualdegree: "paşa mektebi",
  careerlevel: "idare etme",
  workmode: ["full", "remote", "hybrid"],
  category: "it departmanı",
  departmen: "departmanınmmm",
  agemin: "12",
  agemax: "44",
  staj: 1,
  salary: [{ max: 21, min: 12, mode: "aylik" }],
  city: "edirne",
  coordinate: "3432,3423",
  dayendtimework: [{ gün: "pzt", start: "12", finis: "16" }],
  commentpermit: 1,
  applicationpermit: 1,
  urgent: 1,
  taking: ["url", "email"],
  jobID: "",
  userID: "",
};

router.post("/", (req, res, next) => {
  try {
    if (req.user) next();
    else res.json({ result: 0, message: "kullanıcı giriş yamamış" });
  } catch (error) {
    console.log(err);
    res.json({ result: 0, message: "system error 1" });
  }
});

router.post("/", (req, res, next) => {
  try {
   info.title = req.body.title
   info.requirements = req.body.requirements
   info.obligations = req.body.obligations
   info.personalnumber = req.body.personalnumber
   info.finish = req.body.finish,
   info.gender = Number(req.body.gender)
   info.qualdegree = req.body.qualdegree
   info.careerlevel = req.body.careerlevel
   info.workmode = JSON.stringify(req.body.workmode).replace(/'/g, '"');
   info.category = req.body.category
   info.departmen = req.body.departmen
   info.agemin =  req.body.agemin
   info.agemax =  req.body.agemax
   info.staj = req.body.staj
   info.salary = JSON.stringify(req.body.salary).replace(/'/g, '"');
   info.city = req.body.city
   info.coordinate = req.body.coordinate
   info.dayendtimework = JSON.stringify(req.body.dayendtimework).replace(/'/g, '"');
   info.commentpermit = req.body.commentpermit
   info.applicationpermit = req.body.applicationpermit
   info.urgent = req.body.urgent
   info.taking = JSON.stringify(req.body.taking).replace(/'/g, '"');
  info.userID = req.user
  info.jobID = generateRandomToken(30)
next()
} catch (error) {
    console.log(err);
    res.json({ result: 0, message: "system error 2" });
  }
});

router.post("/", (req, res, next) => {
  try {
  push(info).then((data)=>{
    if(data == 1) res.json({result:1,message:"successfull"})
      else  res.json({ result: 0, message: "sql error :(" });
  }).catch(err=>{
    res.json({ result: 0, message: "sql system  error :(" });
  })
  } catch (error) {
    console.log(err);
    res.json({ result: 0, message: "system error 3" });
  }
});

module.exports = router;
