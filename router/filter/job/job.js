let express = require("express");

let router = express.Router();

let { jobFilter, jobFilterDetay } = require("../../../model/filter/job");
let { userTypeControl } = require("./../../../model/user/control");
let { employerGET, userGET } = require("../../../model/user/get");
const stringSimilarity = require("string-similarity");

let info = {
  date: "2024-12-12",
  date2: "2024-12-12",
  workmode: [],
  city: "",
  salary: [],
  staj: "",
  category: "dadsa",
  careerlevel: "idare etme",
  qualdegree: "pasa mektebi",
  coordinate: "232,2312",
  keyword: "software developer",
  r: 1,
  page: 0,
};

router.post("/", (req, res, next) => {
  try {
    info.date = req.body.date;
    info.date2 = req.body.date2;

    info.workmode = JSON.stringify(req.body.workmode).replace(/'/g, '"');
    info.qualdegree = JSON.stringify(req.body.qualdegree).replace(/'/g, '"');
    info.careerlevel = JSON.stringify(req.body.careerlevel).replace(/'/g, '"');
    info.salary = JSON.stringify(req.body.salary).replace(/'/g, '"');
    info.keyword = req.body.keyword;
    info.coordinate = req.body.coordinate;
    info.category = req.body.category;
    info.staj = req.body.staj;
    info.city = req.body.city;
    info.r = req.body.r;
    info.page = req.body.page;

    next();
  } catch (error) {
    res.json({ result: 0, message: "stystem error 1" });
  }
});

router.post("/", (req, res, next) => {
  try {
    jobFilter(info).then((data) => {
      if (data != 404) {
        if (data == "" || data == []) {
          res.json([]);
        } else {
          req.jobfilterArray = data;
          next();
        }
      } else res.json({ result: 0, message: "sql errro" });
    });
  } catch (error) {
    res.json({ result: 0, message: "stystem error 2" });
  }
});
router.post("/", (req, res, next) => {
  try {
    req.jobfilterArray.sort((a, b) => {
      const similarityA = stringSimilarity.compareTwoStrings(
        a.title,
        req.body.keyword
      );
      const similarityB = stringSimilarity.compareTwoStrings(
        b.title,
        req.body.keyword
      );
      return similarityB - similarityA;
    });
    next();
  } catch (error) {
    res.json({ result: 0, message: "stystem error 3" });
  }
});

router.post("/", (req, res, next) => {
  try {
    var sonuclar = [];
    for (var i = 0; i < req.jobfilterArray.length; i += 100) {
      sonuclar.push(req.jobfilterArray.slice(i, i + 100));
    }
    req.jobfilterArray = sonuclar;
    next();
  } catch (error) {
    res.json({ result: 0, message: "stystem error 4" });
  }
});

router.post("/", (req, res, next) => {
  try {
    res.json(req.jobfilterArray[req.body.page]);
  } catch (error) {
    res.json({ reesult: 0, message: "end gelirken hata verdi" });
  }
});

router.post("/:jobID", (req, res, next) => {
  try {
    jobFilterDetay(req.params.jobID).then((data) => {
      if (data != 0) {
        res.json(data);
      } else {
        res.json({ result: 0, message: "sql error" });
      }
    });
  } catch (error) {
    res.json({ result: 0, message: "system error 1" });
  }
});

router.get("/:jobID", (req, res, next) => {
  try {
    if (req.user) {
      next();
    } else {
      res.render("tr/site/jobs-single", { login: 0 });
    }
  } catch (error) {
    res.json({ result: 0, message: "system error 1" });
  }
});

router.get("/:jobID", (req, res, next) => {
  try {
    userTypeControl(req.user)
      .then((data) => {
        req.type = data;
        next();
      })
      .catch((err) => {
        res.json({ result: 0, message: "type control error" });
      });
  } catch (error) {
    res.json({ result: 0, message: "system error 2" });
  }
});

router.get("/:jobID", (req, res, next) => {
  try {
    if (req.type == true) {
      employerGET(req.user).then((data) => {
        res.render("tr/site/jobs-single", { login: 1, userData: data });
      }).catch(err=>{
        res.json({ result: 0, message: " employer get error " });
      })
    }else{
      userGET(req.user).then(data=>{
        res.render("tr/site/jobs-single", { login: 1, userData: data });
      }).catch(err=>{
        res.json({ result: 0, message: " candiddates get error " });
      })
    }
  } catch (error) {
    res.json({ result: 0, message: "system error 3" });
  }
});

module.exports = router;
