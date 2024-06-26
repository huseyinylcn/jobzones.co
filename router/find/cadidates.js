let express = require('express');
const { userTypeControl } = require('../../model/user/control');
const { employerGET, userGET } = require('../../model/user/get');
let router = express.Router()


router.get("/",(req,res,next)=>{
    try {
        if(req.user)next();
        else res.render("tr/site/candidate",{login:0})
        
    } catch (error) {
        res.json({result:0,message:"system error one"})
        
    }
})

router.get("/",(req,res,next)=>{
    try {
        userTypeControl(req.user).then(data=>{
            req.type = data
            next()
        }).catch(err=>{
            res.json({result:0,message:"user type control error"})
        })
    } catch (error) {
        res.json({result:0,message:"system error two"})
        
    }
})

router.get("/",(req,res,next)=>{
    try {
       if(req.type == true || req.type == 'true' || req.type == 1){
        employerGET(req.user).then(data=>{
            res.render("tr/site/candidate",{login:1,userData:data})
        }).catch(err=>{
            res.json({result:0,message:"employer Get error "})
        })
       }else{
        userGET(req.user).then(data=>{
            res.render("tr/site/candidate",{login:1,userData:data})
        }).catch(err=>{
            res.json({result:0,message:"user Get error "})
        })
       }
    } catch (error) {
        res.json({result:0,message:"system error three"})
        
    }
})


module.exports = router