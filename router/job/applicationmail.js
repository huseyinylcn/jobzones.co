let express = require("express");
let router = express.Router();

let { jobGETfUnch } = require("../../model/job/jobGET");
const { mailSend } = require("../../model/notification/jobMail");



router.post("/",(req,res,next)=>{
    try {
        jobGETfUnch(req.body.jobID)
        .then((data) => {
          req.jobINFO = data;
          next()
        })
        .catch((err) => {
          res.json({ result: 0, message: `joget error ${err}` });
        });
        
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})

router.post("/",(req,res,next)=>{
    try {
        
       let taking = JSON.parse(req.jobINFO[0].taking)
       console.log("mail",taking)
     
 let inf = {
    mail:taking[0].value,
    title:"Application",
    message:` <html >
<div style="text-align: center; font-family: sans-serif; width: 100%; max-width: 400px; min-height: 400px; border: 1px solid black; margin: auto; margin-top: 20px;">
    <h3>Yeni bir başvurunuz var</h3>
    
    <p >${req.body.name} iş başvurusunda bulundu <a href="http://localhost:3000${req.body.cvpath}">Linke</a> tıklayarak inceleyebilirsiniz</p>
    <p>${req.body.message}</p>
</div>
</html>`
 }
 mailSend(inf).then(data=>{
    res.json('SuccesFull')
 }).catch(err=>{
    console.log(err)
    res.json({result:0,message:"mail gönderilemedi"})
 })
        
    } catch (error) {
        res.json({result:0,message:"system error 1"})
    }
})

module.exports = router