const express = require("express");
let router = express.Router();

let {userDATAFunc} = require("./../../model/database/userDATA");
let usercandidates = require("./../../model/database/usercandidates");
let {employersDataGetFunc} = require("./../../model/employersGet/employersDataGet");




router.get("/", (req, res) => {
   
  if (req.user) {
    userDATAFunc(req.user).then((data)=>{
        employersDataGetFunc().then(result=>{
            
            res.render("tr/site/employers_grid", { login: 1 ,data:data, result:result});
        })
    })
    
  } else {
    employersDataGetFunc().then(result=>{
            
        res.render("tr/site/employers_grid", { login: 0 , result:result});
    })
   
  }
});


module.exports = router;
