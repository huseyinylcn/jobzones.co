let express = require('express')
let router = express.Router()

let {userGET, employerGET} = require('../../model/user/get')
let {userTypeControl} = require('../../model/user/control')



router.get('/',(req,res,next)=>{
    try {
    if(req.user) next()
    else res.render('tr/site/find-jobs-grid',{login:0})
} catch (error) {
        res.json({result:0,message:"system error 1"})
}
})

router.get('/',(req,res,next)=>{
    try {
        userTypeControl(req.user).then((data)=>{
            if(data != 1 || data != true){
                req.type = false
                next()
            }else{
                req.type = true
                next()
            }
        }).catch(err=>{
            res.json({result:0,message:"user type conrol error"})
        })
    } catch (error) {
        res.json({result:0,message:"system error 2"})
    }

})

router.get('/',(req,res,next)=>{
    try {
        if(req.type != true){
            userGET(req.user).then((data)=>{
                res.render('tr/site/find-jobs-grid',{ login: 1, userData: data})
            }).catch(err=>{
                res.json({result:0,message:"user candidates get error"})
            })
        }else{
            employerGET(req.user).then(data=>{
                res.render('tr/site/find-jobs-grid',{login:1,userData:data})
            }).catch(err=>{
                res.json({result:0,message:"user employers get error"})
            })
        }
        
    } catch (error) {
        res.json({result:0,message:"system error 3"})
        
    }
})


module.exports = router