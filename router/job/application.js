let express = require('express')
let router = express.Router()
let {userGET} = require('../../model/user/get')
let { jobapplicationADD } = require('../../model/job/jobapplication')

let info = {
    username:'',
    userID:'',
    jobID:'',
    cvpath:''
}

router.post("/",(req,res,next)=>{
   try {
    if(req.user) next()
    else res.json({result:0,message:"kullaıcı giriş yapmamış"})
   } catch (error) {
    res.json({result:0,message:"system error 1"})
   }
})

router.post("/",(req,res,next)=>{
    try {
        userGET(req.user).then(data=>{
            info.userID = req.user
            info.username = data.username
            info.jobID = req.body.jobID
            info.cvpath = req.body.cvpath
            next()
        }).catch(err=>{
            res.json({resul:0,message:"kullanıcı verilerini sql vermedi kız biraz ona"})
        })
    
    } catch (error) {
     res.json({result:0,message:"system error 2"})
    }
 })

 router.post("/",(req,res,next)=>{
    try {
        jobapplicationADD(info).then(data=>{
            if(data == 0) res.json({resul:0,message:"iş iş ilanı kayıt edilemedi malesef :("})
            else next()
        }).catch(err=>{
            res.json({resul:0,message:"iş iş ilanı kayıt edilemedi malesef  sql bize yanlış yaptı :("})
        })
    
    } catch (error) {
     res.json({result:0,message:"system error 2"})
    }
 })

 router.post("/",(req,res,next)=>{
    try {
    res.json({result:1,message:'her şey tamam şimdi işverenin isteklerini yapacaz amk'})
    } catch (error) {
     res.json({result:0,message:"system error 2"})
    }
 })

module.exports = router