const express = require("express");
let router = express.Router();
const punycode = require('punycode');
let {
  candidatesDataGETFunc,
  candidatesFilterFunc
} = require("../../model/candidatesGET/candidatesDataGET");
let { userDATAFunc } = require("./../../model/database/userDATA");

const stringSimilarity = require("string-similarity");

let search = (data, keyword, keyword2, keyword3) => {

  keyword = keyword == null ? " " : keyword

  return new Promise((resolve, reject) => {
    const matches = stringSimilarity.findBestMatch(
      keyword.toLowerCase(),
      data.map((data) => data.job.toLowerCase())
    );

    const results = matches.ratings
      .map((match, index) => {
        
       
        let totalScore = 0;
      
        if (keyword3 && data[index].location !== keyword3){
          
          return;
        } 
        let newtales = JSON.parse(data[index].tales);
        newtales.forEach((item) => {
          keyword2.forEach((keyword2) => {
            const match2 = stringSimilarity.findBestMatch(
              keyword2.toLowerCase(),
              [item.toLowerCase()]
            );
            totalScore += match2.ratings[0].rating;
          });
        });

        return {
          data: data[index],
          totalScore: match.rating + totalScore,
        };
      })
      .filter(Boolean); 

    results.sort((a, b) => b.totalScore - a.totalScore);

    resolve(results);
  }).catch(err=>{
   return []
  })
};

function bolmeFonksiyonu(dizi, adet) {
  return new Promise((resolve, reject) => {
    var sonuclar = [];
    for (var i = 0; i < dizi.length; i += adet) {
      sonuclar.push(dizi.slice(i, i + adet));
    }
    resolve(sonuclar);
    reject([])
  }).catch(err =>{
    return []
  })
}
function yilCikar(yilSayisi) {

  let bugun = new Date();

  bugun.setFullYear(bugun.getFullYear() - yilSayisi);

  let yil = bugun.getFullYear();
  let ay = String(bugun.getMonth() + 1).padStart(2, '0'); 
  let gun = String(bugun.getDate()).padStart(2, '0');

  return `${yil}-${ay}-${gun}`;
}

// Örnek kullanım
let sonuc = yilCikar(5);
console.log(sonuc);  // Örneğin: 2019-05-26 (bugünün tarihine göre değişir)


router.get("/", (req, res) => {


  if (req.user) {
    userDATAFunc(req.user).then((userInfo) => {
      res.render("tr/site/candidate", { login: 1, data: userInfo });
    });
  } else {
    res.render("tr/site/candidate", { login: 0 });
  }


});

router.post("/", (req, res) => {
  if (!req.body.status){
    if (req.user) {
      userDATAFunc(req.user).then((userInfo) => {
        candidatesDataGETFunc().then((data) => {
          search(data, userInfo.job, JSON.parse(userInfo.tales)).then(
            (result) => {
              bolmeFonksiyonu(result, 100).then((element) => {
                res.json({ result: element[req.body.page],totalpage:element.length });
              
              });
            }
          );
        });
      });
   
    } else {

      candidatesDataGETFunc().then((data) => {
        search(data, "", [],'').then((result) => {
          bolmeFonksiyonu(result, 100).then((element) => {
            res.json({ result: element[req.body.page],totalpage:element.length });
           
          });
        });
      });

    }
  } else {
    candidatesFilterFunc(req.body.params).then(data=>{
      search(data, String(req.body.job), JSON.parse(req.body.tales), req.body.location).then(
        (result) => {
          bolmeFonksiyonu(result, 100).then((element) => {
            res.json({ result: element[req.body.page],totalpage:element.length });
            
          });
        }
      );
    })



    candidatesDataGETFunc().then((data) => {

  
    });
  }
});

module.exports = router;
