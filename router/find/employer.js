let express = require('express')

let router = express.Router()


router.get("/",(req,res,next)=>{
    try {
        if(req.user) next();
        else res.render("tr/site/employers_grid",{login:0,})
        
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})
router.get("/",(req,res,next)=>{
    
})





module.exports = router