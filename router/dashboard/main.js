const express = require("express");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
let router = express.Router();

let {
  aboutEducationUpdateFunc,
  aboutUpdateFunc,
} = require("./../../model/database/aboutEducationUpdate");

let {preferenceDatePosted , preferenceDepartman} = require("./../../model/database/preferenceUpdateStatus");


let {
  profileInfoUpdateFunc,
  employerInfoUpdateFunc,
  employerInfo2UpdateFunc,
} = require("./../../model/database/profilinfoUpdate");

let {extraImg,userImgCoverUpdateFunc,userImgUpdateFunc} = require("./../../model/database/userImgUpdate");
let profleinfoUpdate2 = require("./../../model/database/profleinfoUpdate2");

let userDATA = require("./../../model/database/userDATA");

let { uploads } = require("./../../model/transform/singleUpload");
let { uploadsAll } = require("./../../model/transform/sngleUploadAll");

let { uploadsKP } = require("./../../model/transform/singleUploadKP");

router.get("/", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      if (data.employers) {
        res.render("tr/dashboard/employer-dashboard", {
          login: 1,
          data: data,
        });
      } else {
        res.render("tr/dashboard/candidates-dashboard", {
          login: 1,
          data: data,
        });
      }
    });
  } else {
    res.redirect("/login/");
  }
});

router.get("/profiloverview/", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      if (data.employers) {
        let newTales = JSON.parse(data.tales);
        let newPhoto = JSON.parse(data.extraPhoto);
    
        res.render("tr/dashboard/employer-profile", {
          login: 1,
          data: data,
          tales: newTales,
          exstraPhoto:newPhoto
        });
      } else {

        console.log('data',data)
        let newEducation = JSON.parse(data.education);
        let newTales = JSON.parse(data.tales);
        let mode = JSON.parse(data.mode);
        res.render("tr/dashboard/candidates-overview", {
          login: 1,
          data: data,
          education: newEducation,
          tales: newTales,
          mode:mode
        });
      }
    });
  } else {
    res.redirect("/login/");
  }
});

router.post("/profileoverview/imgPush/", (req, res, next) => {
  let silenecek = ''
  if (req.user) {
    try {
      userDATA.userDATAFunc(req.user).then((data) => {
        if('/ProfilPicture/profileImg/default.jpeg' != data.photo){
         silenecek = `public/${data.photo}`;
        }else{
          silenecek = `public/${data.photo}aaa`;

        }
        

        fs.unlink(silenecek, (err) => {
          uploads(req, res, (err) => {
            if (err) {
              console.log("error verdi", err);
            } else {
              var dosyaAdi = path.basename(req.file.filename);
              let FullFileName = `/ProfilPicture/profileImg/${dosyaAdi}`;

              userImgUpdateFunc(FullFileName, req.user)
                .then((v) => {
                  res.json({ url: 12 });
                })
                .catch((err) => {
                  console.log("burada", err);
                });
            }
          });
        });
      });
    } catch (error) {
      console.log("error");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/profileoverview/imgPushKP/", (req, res, next) => {
  if (req.user) {
    try {
      userDATA.userDATAFunc(req.user).then((data) => {
        let silenecek = `public/${data.coverPhoto}`;

        fs.unlink(silenecek, (err) => {
          uploadsKP(req, res, (err) => {
            if (err) {
              console.log("error verdi", err);
            } else {
              var dosyaAdi = path.basename(req.file.filename);
              let FullFileName = `/ProfilPicture/coverImg/${dosyaAdi}`;

              userImgCoverUpdateFunc(FullFileName, req.user)
                .then((v) => {
                  res.json({ url: 12 });
                })
                .catch((err) => {
                  console.log("burada", err);
                });
            }
          });
        });
      });
    } catch (error) {
      console.log("error");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/profiloverview/", (req, res) => {
  if (req.user) {
    let education = JSON.stringify(req.body.education);
    let about = String(req.body.about);
    let newEducation = education.replace(/'/g, '"');
    let newAbout = about.replace(/'/g, '"');

    aboutEducationUpdateFunc(newAbout, newEducation, req.user).then((data) => {
      res.json(1);
    });
  } else {
    res.redirect("/");
  }
});

router.post("/profiloverviewtwo/", (req, res) => {
  if (req.user) {
    profileInfoUpdateFunc(req.body, req.user).then((data) => {
      res.json(1);
    
    });
    let modeArray = JSON.stringify(req.body.modeArray)
    console.log("new", modeArray)
   

    preferenceDepartman(req.user,req.body.departman,modeArray).then((data)=>{
   
      console.log(data)
    })


  } else {
    res.redirect("/login");
  }
});

router.post("/profiloverviewthreee/", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then(data=>{
     
      if(req.body.status != data.status){
        preferenceDatePosted(req.user).then(data=>{
          console.log(data)
        })
      }
    })
    let talent = JSON.stringify(req.body.talent);
    let newTalent = talent.replace(/'/g, '"');
    profleinfoUpdate2
      .profileInfoUpdate(
        newTalent,
        req.body.fullname,
        req.body.status,
        req.user
      )
      .then((data) => {
        res.json(data.recordset[0].photo);
      });
  } else {
    res.redirect("/login");
  }
});

router.post("/employerOne/", (req, res) => {
  if (req.user) {
    let talent = JSON.stringify(req.body.talent);
    let newTalent = talent.replace(/'/g, '"');

    employerInfoUpdateFunc(newTalent, req.body, req.user)
      .then((data) => {
      
        res.json(1);
      })
      .catch((err) => {
        res.json(0);
      });
  } else {
    res.redirect("/login");
  }
});

router.post("/employerTwo/", (req, res) => {
  if (req.user) {
    employerInfo2UpdateFunc(req.body, req.user).then((data) => {
      res.json(data);
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/employerThree/", (req, res) => {
  if (req.user) {
    aboutUpdateFunc(req.body.about, req.user).then((data) => {
      res.json(data);
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/profileoverview/employerIMG/", (req, res, next) => {
  let imagePath = []
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      try {
        let allFileArray = JSON.parse(data.extraPhoto);
        allFileArray.forEach((element) => {
       
          let silenecek = `public/${element}`;
          console.log(silenecek)
          fs.unlink(silenecek, (err) => {
            if (err) console.log("dosya yok veya silinirken hata verdi", err);
          });
        });
      } catch (error) {
        console.log('buyul ihtimal mssql gelen veri parse edilemedi')
      }
     

      uploadsAll(req, res, (err) => {
        if (err) {
          console.log("error verdi", err);
        } else {
         
          let cevap = (req.files)
          cevap.forEach((element) => {
              imagePath.push(`/ProfilPicture/exstraImg/${element.filename}`)
              
            })
           let allFileArrayString =  JSON.stringify(imagePath)
           let newArray = allFileArrayString.replace(/'/g, '"');
           extraImg(newArray,req.user).then((result)=>{
            res.json(1)
           })
        }
      });
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
