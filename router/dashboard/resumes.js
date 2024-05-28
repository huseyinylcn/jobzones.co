const express = require("express");
const path = require("path");
const fs = require("fs");

let router = express.Router();

let userDATA = require("./../../model/database/userDATA");
let { cvUpdateFunc } = require("./../../model/database/cvUpdate");

let { uploads } = require("./../../model/transform/cvUpload");

router.get("/", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      res.render("tr/dashboard/resumes", {
        login: 1,
        data: data,
      });
    });
  } else {
    res.redirect("/login/");
  }
});

router.post("/", (req, res, next) => {
  if (req.user) {
    uploads(req, res, (err) => {
      if (err) {
        console.log("error!", err);
      } else {
        userDATA.userDATAFunc(req.user).then((data) => {
          fs.unlink(`public/${data.cv}`, (err) => {
            var dosyaAdi = path.basename(req.file.filename);
            let FullFileName = `/cv/${dosyaAdi}`;
            cvUpdateFunc(FullFileName,req.user).then((result)=>{
                
                res.json({end:FullFileName})
            })
          });
        });

      }
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
