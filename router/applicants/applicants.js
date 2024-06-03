let express = require("express");
let router = express.Router();

let { candidatesGET } = require("../../model/filter/applicants");
const stringSimilarity = require("string-similarity");

router.post("/", (req, res, next) => {
  try {
    req.body.mode = JSON.stringify(req.body.mode).replace(/'/g, '"');
    candidatesGET(req.body)
      .then((data) => {
        req.candidatesArray = data;
        next();
      })
      .catch((err) => {
        res.json({
          reesult: 0,
          message: "candidates gelirken hata verdi sql error",
        });
      });
  } catch (error) {
    res.json({ reesult: 0, message: "candidates gelirken hata verdi" });
  }
});

router.post("/", (req, res, next) => {
  try {
    req.candidatesArray.sort((a, b) => {
      const similarityA = stringSimilarity.compareTwoStrings(
        a.job,
        req.body.keyword
      );
      const similarityB = stringSimilarity.compareTwoStrings(
        b.job,
        req.body.keyword
      );
      return similarityB - similarityA;
    });
    next();
  } catch (error) {
    res.json({ reesult: 0, message: "filterlama gelirken hata verdi" });
  }
});

router.post("/", (req, res, next) => {
  try {
    var sonuclar = [];
    for (var i = 0; i < req.candidatesArray.length; i += 100) {
      sonuclar.push(req.candidatesArray.slice(i, i + 100));
    }
    req.candidatessonuc = sonuclar;
    next();
  } catch (error) {
    res.json({ reesult: 0, message: "bölme gelirken hata verdi" });
  }
});

router.post("/", (req, res, next) => {
    try {
     res.json(req.candidatessonuc[req.body.page])
    } catch (error) {
      res.json({ reesult: 0, message: "end gelirken hata verdi" });
    }
  });


module.exports = router;
