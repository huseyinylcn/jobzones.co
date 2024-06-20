const nodemailer = require("nodemailer");

let mailSend = (info) => {

  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'info@jobzones.co',
            pass:'rfgpvxoeszcrtswc'
        }
    })
    
    let mailOptions = {
        from:'info@jobzones.co',
        to:`${info.mail}`,
        subject:`${info.title}`,
        html:`${info.message}`
    }
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            reject(0)
        }else{
            resolve(1)
        }
    })
  });
};

module.exports = { mailSend };
