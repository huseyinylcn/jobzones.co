let express = require('express')
let router = express.Router()


let {proprietorGET} = require('../../../model/filter/proprietor')
const stringSimilarity = require("string-similarity");


router.post("/",(req,res,next)=>{
    try {
        proprietorGET(req.body).then(data=>{
            req.proprietorArray = data
            next()
        }).catch(err=>{
            res.json({result:0,message:"sql error"})
        })
    } catch (error) {
        res.json({result:0,message:"system error"})
        
    }
})


router.post("/",(req,res,next)=>{
    try {
        req.proprietorArray.sort((a, b) => {
            const similarityA = stringSimilarity.compareTwoStrings(
              a.fullname,
              req.body.keyword
            );
            const similarityB = stringSimilarity.compareTwoStrings(
              b.fullname,
              req.body.keyword
            );
            return similarityB - similarityA;
          });

          next()
    } catch (error) {
        res.json({result:0,message:`system error 2 ${error}`})
        
    }
})


router.post("/", (req, res, next) => {
    try {
      var sonuclar = [];
      for (var i = 0; i < req.proprietorArray.length; i += 100) {
        sonuclar.push(req.proprietorArray.slice(i, i + 100));
      }
      req.proprietorArrayend = sonuclar;
      next();
    } catch (error) {
      res.json({ reesult: 0, message: "bölme gelirken hata verdi" });
    }
  });


  router.post("/", (req, res, next) => {
    try {
     res.json(req.proprietorArrayend[req.body.page])
    } catch (error) {
      res.json({ reesult: 0, message: "end gelirken hata verdi" });
    }
  });



module.exports = router