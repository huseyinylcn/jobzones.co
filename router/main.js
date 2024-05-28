const express = require("express");
let router = express.Router();

let userDATA = require("./../model/database/userDATA");
let usercandidates = require("./../model/database/usercandidates");

router.get("/", (req, res) => {
  res.redirect("/home/");
});

router.get("/home", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      res.render("tr/site/Home-02", { login: 1, data: data });
    });
  } else {
    res.render("tr/site/Home-02", { login: 0 });
  }
});

router.get("/infoplus", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((data) => {
      res.render("tr/dashboard/infoPlus", { login: 1, data: data });
    });
  } else {
    res.redirect('/')
  }
});


router.get("/infoplusemployer", (req, res) => {
if(req.user){
  userDATA.userDATAFunc(req.user).then((data)=>{
    res.render("tr/dashboard/infoplus2",{login:1, data:data});

  })
}else{
  res.redirect('/')
}
 
  
});


router.get("/job/detail/", (req, res) => {
  if (req.user) {
    res.render("tr/site/jobs-single2", { login: 1 });
  } else {
    res.render("tr/site/jobs-single2", { login: 0 });
  }
});

router.get("/job/", (req, res) => {
  if (req.user) {
    res.render("tr/site/find-jobs-grid", { login: 1 });
  } else {
    res.render("tr/site/find-jobs-grid", { login: 0 });
  }
});

router.get("/employers/", (req, res) => {
  if (req.user) {
    res.render("tr/site/employers_grid", { login: 1 });
  } else {
    res.render("tr/site/employers_grid", { login: 0 });
  }
});

router.get("/blog/", (req, res) => {
  if (req.user) {
    res.render("tr/site/blog-grid", { login: 1 });
  } else {
    res.render("tr/site/blog-grid", { login: 0 });
  }
});

router.get("/blog/detail/", (req, res) => {
  if (req.user) {
    res.render("tr/site/blog-detail", { login: 1 });
  } else {
    res.render("tr/site/blog-detail", { login: 0 });
  }
});

router.get("/about/", (req, res) => {
  if (req.user) {
    res.render("tr/site/about-us", { login: 1 });
  } else {
    res.render("tr/site/about-us", { login: 0 });
  }
});

router.get("/faqs/", (req, res) => {
  if (req.user) {
    res.render("tr/site/accordion-page", { login: 1 });
  } else {
    res.render("tr/site/accordion-page", { login: 0 });
  }
});

router.get("/termofuse/", (req, res) => {
  if (req.user) {
    res.render("tr/site/term-of-use", { login: 1 });
  } else {
    res.render("tr/site/term-of-use", { login: 0 });
  }
});

router.get("/contact/", (req, res) => {
  if (req.user) {
    res.render("tr/site/contact-us", { login: 1 });
  } else {
    res.render("tr/site/contact-us", { login: 0 });
  }
});
router.get("/logout/", (req, res) => {
  req.logout((err) => {
    res.redirect("/");
  });
});

router.get("/:users/", (req, res) => {
  if (req.user) {
    userDATA.userDATAFunc(req.user).then((result) => {
      usercandidates.usercandidatesF(req.params.users).then((data) => {
        // console.log(data.length)
        if (data.length == 1) {
          if (data[0].employers == 1) {
            let tales = JSON.parse(data[0].tales);
            let exstraPhoto = JSON.parse(data[0].extraPhoto);

            res.render("tr/site/employerProfile", {
              login: 1,
              data: data[0],
              tales: tales,
              exstraPhoto: exstraPhoto,
              user: result,
            });
          } else {
            let tales = JSON.parse(data[0].tales);
            let education = JSON.parse(data[0].education);

            res.render("tr/site/profile", {
              login: 1,
              data: data[0],
              education: education,
              tales: tales,
              user: result,
            });
          }
        } else {
          res.send("plesss...");
        }
      });
    });
  } else {
    usercandidates.usercandidatesF(req.params.users).then((data) => {
      // console.log(data.length)
      if (data.length == 1) {
        if (data[0].employers == 1) {
          let tales = JSON.parse(data[0].tales);
          let exstraPhoto = JSON.parse(data[0].extraPhoto);

          res.render("tr/site/employerProfile", {
            login: 0,
            data: data[0],
            tales: tales,
            exstraPhoto: exstraPhoto,
          });
        } else {
          let tales = JSON.parse(data[0].tales);
          let education = JSON.parse(data[0].education);

          res.render("tr/site/profile", {
            login: 0,
            data: data[0],
            education: education,
            tales: tales,
          });
        }
      } else {
        res.send("/candidates");
      }
    });
  }
});

module.exports = router;
