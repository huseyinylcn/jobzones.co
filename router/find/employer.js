let express = require("express");

let router = express.Router();
let { userTypeControl, login } = require("./../../model/user/control");
let { employerGET, userGET } = require("./../../model/user/get");

router.get("/", (req, res, next) => {
  try {
    if (req.user) next();
    else res.render("tr/site/employers_grid", { login: 0 });
  } catch (error) {
    res.json({ result: 0, message: "system error 1" });
  }
});
router.get("/", (req, res, next) => {
  try {
    userTypeControl(req.user)
      .then((data) => {
        req.type = data;
        next();
      })
      .catch((err) => {
        res.json({
          result: 0,
          message:
            "user type controll error not(olur böyl şeyler takma kafana kardeşim :)",
        });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 2" });
  }
});
router.get("/", (req, res, next) => {
  try {
    if (req.type == "true" || req.type == true) {
      employerGET(req.user).then((data) => {
        res.render("tr/site/employers_grid",{login:1,userData:data})
      }).catch(err=>{
        res.json({result:0,message:"employer gelmedi iyi  çek ulanannn"})
      })
    }else{
        userGET(req.user).then(data=>{
        res.render("tr/site/employers_grid",{login:1,userData:data})
        }).catch(err=>{
            res.render({result:0,message:"candidates gelmedi basmaya devam kardeşimmmmmm"})
        })
    }
  } catch (error) {
    res.json({ result: 0, message: "system error 3" });
  }
});
module.exports = router;
