const express = require("express");
const passport = require("passport");
const path = require("path");
const fs = require("fs");

let {
  update,
  updateProfileIMG,
  updateBannerIMG,
  updateimgAll,
  updatecv,
  updateJobDate
} = require("../../model/user/update");
let { img, imgBanner, imgAll, uploadcv } = require("../../model/user/img");
let { userGET } = require("../../model/user/get");

let info = {
  fullname: "hüseyin yalçın",
  gender: 1,
  birth: "/js/kk/kk.jpg",
  category: "kategori ver bana",
  job: "",
  cvpath: "/dasdas/asdas",
  phone: "78484 84ew84 4848",
  adres: "edirne li kamil babab",
  city: "edirne",
  coordinate: "131221 3213123",
  videoURL: "/dadas/dasd",
  social: ["/wqeqwe", "fdsfsdf", "fdsfsdf"],
  education: [{ a: 3232, b: 3433 }, {}, {}],
  qualdegree: "dasdasd",
  careerlevel: "sadasd",
  experience: [{ c: 3232, d: 3433 }, {}, {}],
  language: ["/wqeqwe", "fdsfsdf", "fdsfsdf"],
  reference: [{ a: 3232, b: 3433 }, {}, {}],
  hobby: ["/wqeqwe", "fdsfsdf", "fdsfsdf"],
  workmode: ["/wqeqwe", "fdsfsdf", "fdsfsdf"],
  salary: [{ c: 3232, d: 3433 }, {}, {}],
  dayandtimework: [{ a: 3232, b: 3433 }, {}, {}],
  views: 1,
  department:''

};

let router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.render("tr/site/login", { login: 1 });
  } else {
    res.render("tr/site/login", { login: 0 });
  }
});

router.post("/img", (req, res, next) => {
  console.log(1);
  try {
    if (req.user) {
      userGET(req.user)
        .then((data) => {
          if (data.profileIMG != "/img/default.jpg") {
            fs.unlink(`public/${data.profileIMG}`, (err) => {
              if (err) {
                console.log("eski dosya silinemedi", err);
                next();
              } else next();
            });
          } else next();
        })
        .catch((err) => {
          res.json({
            result: 0,
            message: `Kullanıcı biligleri veri tabanından gelemedi System Error ${err}`,
          });
        });
    } else {
      res.json({
        result: 0,
        message: `Kullsanıcı giriş yapmamış giriş yaptır`,
      });
    }
  } catch (error) {
    res.json({ result: 0, message: `img add Error ${error}` });
  }
});

router.post("/img", (req, res, next) => {
  console.log(2);
  try {
    img(req, res, (err) => {
      if (err) {
        updateProfileIMG(req.user, `/img/default.jpg`)
          .then((data) => {
            res.json({
              result: 0,
              message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine geldi tekrar dene ${err}`,
            });
          })
          .catch((errors) => {
            res.json({
              result: 0,
              message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi ${errors}`,
            });
          });
      } else next();
    });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi system error!! ${error}`,
    });
  }
});

router.post("/img", (req, res, next) => {
  try {
    console.log(3);
    updateProfileIMG(
      req.user,
      `/ProfilPicture/profileImg/${path.basename(req.file.filename)}`
    )
      .then((data) => {
        console.log(path.basename(req.file.filename));
        res.json({ result: 1, messsage: "successfull" });
      })
      .catch((err) => {
        res.json({
          result: 0,
          message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end  ${err}`,
        });
      });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end  ${err}`,
    });
  }
});

router.post("/banner", (req, res, next) => {
  try {
    if (req.user) {
      userGET(req.user)
        .then((data) => {
          if (data.bannerIMG != "/img/default.jpg") {
            fs.unlink(`public/${data.bannerIMG}`, (err) => {
              if (err) {
                console.log("eski dosya silinemedi", err);
                next();
              } else next();
            });
          } else next();
        })
        .catch((err) => {
          res.json({
            result: 0,
            message: `Kullanıcı biligleri veri tabanından gelemedi System Error ${err}`,
          });
        });
    } else {
      res.json({
        result: 0,
        message: `Kullsanıcı giriş yapmamış giriş yaptır`,
      });
    }
  } catch (error) {
    res.json({ result: 0, message: `img add Error ${error}` });
  }
});

router.post("/banner", (req, res, next) => {
  console.log(2);
  try {
    imgBanner(req, res, (err) => {
      if (err) {
        updateBannerIMG(req.user, `/img/default.jpg`)
          .then((data) => {
            res.json({
              result: 0,
              message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine geldi tekrar dene ${err}`,
            });
          })
          .catch((errors) => {
            res.json({
              result: 0,
              message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi ${errors}`,
            });
          });
      } else next();
    });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi system error!! ${error}`,
    });
  }
});

router.post("/banner", (req, res, next) => {
  try {
    console.log(3);
    updateBannerIMG(
      req.user,
      `/ProfilPicture/banner/${path.basename(req.file.filename)}`
    )
      .then((data) => {
        console.log(path.basename(req.file.filename));
        res.json({ result: 1, messsage: "successfull" });
      })
      .catch((err) => {
        res.json({
          result: 0,
          message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end  ${err}`,
        });
      });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end  ${err}`,
    });
  }
});

router.post("/imgall", (req, res, next) => {
  try {
    if (req.user) {
      userGET(req.user)
        .then((data) => {
          let array = JSON.parse(data.photos);
          array.forEach((element) => {
            fs.unlink(`public/${element}`, (err) => {
              if (err) console.log("dizideki bir dosya silinemedi", err);
            });
          });
          next();
        })
        .catch((err) => {
          res.json({
            result: 0,
            message: "kullanıcı biligleri gelemedi bir hata var",
          });
        });
    } else {
      res.json({
        result: 0,
        message: `Kullsanıcı giriş yapmamış giriş yaptır`,
      });
    }
  } catch (error) {
    res.json({ result: 0, message: `img add Error ${error}` });
  }
});

router.post("/imgall", (req, res, next) => {
  try {
    imgAll(req, res, (err) => {
      if (err) res.json({ result: 0, message: "img Error" });
      else next();
    });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi system error!! ${error}`,
    });
  }
});

router.post("/imgall", (req, res, next) => {
  try {
    const filenamesArray = req.files.map(
      (image) => `/ProfilPicture/extstraImg/${image.filename}`
    );
    let STRINGfilenameARRAY = JSON.stringify(filenamesArray);
    updateimgAll(req.user, STRINGfilenameARRAY)
      .then((data) => {
        res.json({ result: 1, message: "successfull" });
      })
      .catch((err) => {
        res.json({ result: 0, message: "img path recod database Error" });
      });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end  ${err}`,
    });
  }
});

router.post("/cv", (req, res, next) => {
  try {
    if (req.user) {
      userGET(req.user)
        .then((data) => {
          fs.unlink(`public/${data.cvpath}`, (err) => {
            if (err) console.log("cv silinemedi");
            next();
          });
        })
        .catch((err) => {
          res.json({
            result: 0,
            message: "kullanıcı biligleri gelemedi bir hata var",
          });
        });
    } else {
      res.json({
        result: 0,
        message: `Kullsanıcı giriş yapmamış giriş yaptır`,
      });
    }
  } catch (error) {
    res.json({ result: 0, message: `cv add Error ${error}` });
  }
});

router.post("/cv", (req, res, next) => {
  try {
    uploadcv(req, res, (err) => {
      if (err) res.json({ result: 0, message: "cv Error" });
      else next();
    });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen cv kayıt edilemedi ve eski cv silindi default yerine gelemedi system error!! ${error}`,
    });
  }
});

router.post("/cv", (req, res, next) => {
  try {
    updatecv(req.user, `/cv/${req.file.filename}`)
      .then((data) => {
        res.json({ result: 1, message: "successfull" });
      })
      .catch((err) => {
        res.json({ result: 0, message: "cv path recod database Error" });
      });
  } catch (error) {
    res.json({
      result: 0,
      message: `girilen cv kayıt edilemedi ve eski cv silindi default yerine gelemedi end  ${err}`,
    });
  }
});

router.post("/", (req, res, next) => {
  try {
    if (req.user) next();
    else res.json({ result: 0, message: "kullanıcı giriş yapmamış" });
  } catch (error) {
    res.json({ result: 0, message: "İstek Hatalı " });
  }
});
router.post("/", (req, res, next) => {
  try {
    info.social = JSON.stringify(req.body.social).replace(/'/g, '"');
    info.education = JSON.stringify(req.body.education).replace(/'/g, '"');
    info.social = JSON.stringify(req.body.social).replace(/'/g, '"');
    info.language = JSON.stringify(req.body.language).replace(/'/g, '"');
    info.reference = JSON.stringify(req.body.reference).replace(/'/g, '"');
    info.hobby = JSON.stringify(req.body.hobby).replace(/'/g, '"');
    info.workmode = JSON.stringify(req.body.workmode).replace(/'/g, '"');
    info.salary = JSON.stringify(req.body.salary).replace(/'/g, '"');
    info.dayandtimework = JSON.stringify(req.body.dayandtimework).replace(
      /'/g,
      '"'
    );

    info.fullname = req.body.fullname;
    info.gender = Number(req.body.gender)
    info.birth = req.body.birth;
    info.category = req.body.category;
    info.phone = req.body.phone;
    info.adres = req.body.adres;
    info.city = req.body.city;
    info.coordinate = req.body.coordinate;
    info.videoURL = req.body.videoURL;
    info.qualdegree = req.body.qualdegree;
    info.careerlevel = req.body.careerlevel;
    info.careerlevel = req.body.careerlevel;
    info.job = req.body.job;
    info.department = req.body.department;
    info.views = Number(req.body.views)
    


    next();
  } catch (error) {
    res.json({ result: 0, message: `transform Error ${error}` });
  }
});

router.post("/", (req, res, next) => {
  try {
    userGET(req.user).then(data=>{
      if(data.views != info.views){
       updateJobDate(req.user).then((veri)=>{
        if(veri == 1) next()
          else res.json({result:0,message:"jobdate kayıt edilemedi işlem burada durduruldu"})
       })
      }else{
       next()
      }
     })
  } catch (error) {
    res.json({ result: 0, message: `update Error ${error}` });
  }
});


router.post("/", (req, res, next) => {
  try {
    update(req.user, info)
      .then((data) => {
        if (data == 0) res.json({ result: 0, message: `update Error ` });
        else res.json({ result: 1, message: `Successfull` });
      })
      .catch((err) => {
        res.json({ result: 0, message: `update Error ${err}` });
      });
  } catch (error) {
    res.json({ result: 0, message: `update Error ${error}` });
  }
});


module.exports = router;
