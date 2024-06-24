let express = require('express')
let router = express.Router()
let { updateEmployer, updateProfileIMGEmployer, updateBannerIMGEmployer, updateimgAllEmployer } = require('../../model/user/update')
let { employerGET, userGET, usernamewithGET } = require('../../model/user/get')
let { img,imgAll,imgBanner } = require('../../model/user/img')
let {userTypeControl} = require("../../model/user/control")
let path = require('path')
let fs = require('fs')

let bannerDefault = "/img/default.jpg"


let info = {
    fullname: 'Baykar teknoloji',
    sector: 'savunma sanayi',
    aboutshort: 'lorem 34 sadasd ',
    phone: '0541 728 1588',
    weburl: 'http:local:300',
    history: 'şirket geçmişi',
    size: '11-50',
    city: 'Bakı',
    videourl: 'http:14',
    social: [],
    coordinate: '3232,32323',
    views: 1,
    commentpermit: 1
  }
  
router.get("/",(req, res, next)=>{
 
    if(req.user) next()
    else res.json(0)
})

router.get("/",(req, res, next)=>{
   
    employerGET(req.user).then(data=>{

        res.json(data)
    })
})

router.post("/",(req,res,next)=>{
    try {
    if(req.user){
        let social = JSON.stringify(req.body.social).replace(/'/g, '"');
        info.fullname = req.body.fullname
        info.sector = req.body.sector
        info.aboutshort = req.body.aboutshort
        info.phone = req.body.phone
        info.weburl = req.body.weburl
        info.history = req.body.history
        info.size = req.body.size
        info.city = req.body.city
        info.videourl = req.body.videourl
        info.social = social
        info.coordinate = req.body.coordinate
        info.views = Number(req.body.views)
        info.commentpermit = Number(req.body.commentpermit)
        next()
    }
    else res.json({result:0,message:'kullanıcı giriş yapmamış'})
} catch (error) {
    res.json({result:0,message:'gelen veri formatı yanlış olabiir veya istek hatalı'})
}
})

router.post("/",(req,res,next)=>{
    try {
    updateEmployer(req.user,info).then(data=>{
        if(data==1) next()
        else res.json({result:0,message:'veri tabanına kayıt edilemedi '})
    }).catch(err=>{
        res.json({result:0,message:'veri tabanına kayıt edilemedi 2 '})
    })
} catch (error) {
    res.json({result:0,message:'veri tabanına kayıt edilemedi  system error '})
}
})

router.post("/",(req,res,next)=>{
    try {
        res.json({result:1,message:'Succesfull '})
} catch (error) {
    res.json({result:0,message:'end system error'})
}
})



router.post("/img", (req, res, next) => {
  
    try {
      if (req.user) {
        employerGET(req.user)
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

    try {
      img(req, res, (err) => {
        if (err) {
            updateProfileIMGEmployer(req.user, `/img/default.jpg`)
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
        updateProfileIMGEmployer(
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
            message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end 1  ${err}`,
          });
        });
    } catch (error) {
      res.json({
        result: 0,
        message: `girilen fotoğraf kayıt edilemedi ve eski fotoğraf silindi default yerine gelemedi end 2 `,
      });
    }
  });
  

  
router.post("/banner", (req, res, next) => {
    try {
      if (req.user) {
        employerGET(req.user)
          .then((data) => {
            if (data.bannerIMG != bannerDefault) {
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
 
    try {
      imgBanner(req, res, (err) => {
        if (err) {
          updateBannerIMGEmployer(req.user, bannerDefault)
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
      updateBannerIMGEmployer(
        req.user,
        `/ProfilPicture/banner/${path.basename(req.file.filename)}`
      )
        .then((data) => {
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
        employerGET(req.user)
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
      updateimgAllEmployer(req.user, STRINGfilenameARRAY)
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

  router.post("/:username",(req,res,next)=>{
    try {
      usernamewithGET(req.params.username).then(userID =>{
        req.userID = userID;
        next();
      }).catch(err=>{
        res.json({result:0,message:"usernamewithGET zoort oldu"})
      })
    } catch (error) {
      res.json({result:0,message:"system error one"})
      
    }
  })

  router.post("/:username",(req,res,next)=>{
    try {
     employerGET(req.userID.userID).then(data=>{
      res.json(data)
     }).catch(err=>{
      res.json({result:0,message:"employer gelirken hata verdi"})
     })
    } catch (error) {
      res.json({result:0,message:`system error two ${error}`})
      
    }
  })

  router.get("/:username",(req,res,next)=>{
    try {
      
      if(req.user) next();
      else res.render("tr/site/employers-single",{login:0})
      
    } catch (error) {
      res.json({result:0,message:"system error one"})
      
    }
  })

  router.get('/:username',(req,res,next)=>{
    try {
      userTypeControl(req.user).then(data=>{
        req.type = data;
        next()
      }).catch(err=>{
        res.render({result:0,message:"user type gelmedi :( error "})
      })
    } catch (error) {
      res.json({result:0,message:`system error two ${error}`})
    }
  })

  router.get('/:username',(req,res,next)=>{
    try {
    if(req.type == true || req.type == 'true'){
      employerGET(req.user).then(data=>{
        res.render("tr/site/employers-single",{login:1, userData:data})
      }).catch(err=>{
        res.json({result:0,message:"employer gelmedi zaten sevmem ben iş verenleri :)"})
      })
    }else{
      userGET(req.user).then(data=>{
        res.render("tr/site/employers-single",{login:1, userData:data})
      }).catch(err=>{
        res.json({result:0,message:"candidate get error :( "})
      })
    }

    } catch (error) {
      res.json({result:0,message:`system error three ${error}`})
    }
  })


module.exports = router