let express = require('express')
let router = express.Router()


router.get("/",(req,res,next)=>{
    try {
        if(req.user)next();
        else res.render("tr/site/candidate",{login:0})
        
    } catch (error) {
        res.json({result:0,message:"system error one"})
        
    }
})



module.exports = router