let express = require('express')
let router = express.Router()
let {userTypeControl} = require("./../../model/user/control")
let {userGET,employerGET} = require("./../../model/user/get")


router.get("/",(req,res,next)=>{
    try {
        if(req.user) next();
        else res.render("tr/site/contact-us",{login:0})
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})

router.get("/",(req,res,next)=>{
    try {
        userTypeControl(req.user).then(data=>{
            req.type = data;
            next()
        }).catch(err=>{
            res.json({result:0,message:"user type  get error"})
        })
        
    } catch (error) {
        res.json({result:0,message:"system error 2"})
    }
})

router.get("/",(req,res,next)=>{
    try {
        if(req.type == true || req.type == 'true' || req.type == 1){
            employerGET(req.user).then(data=>{
                res.render("tr/site/contact-us",{login:1,userData:data})
            }).catch(err=>{
                res.json({result:0,message:"employer  get error"})
            })
        }else{
            userGET(req.user).then(data=>{
                res.render("tr/site/contact-us",{login:1,userData:data})
            }).catch(err=>{
                res.json({result:0,message:"candidates  get error"})
            })
        }

        
    } catch (error) {
        res.json({result:0,message:"system error 2"})
    }
})





module.exports = router