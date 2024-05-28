const nodemailer = require("nodemailer");
let yusuf=22
let hsyn = 15
let hysnnnnn= 10
let verifiFunc = (code, mail) => {
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
        to:`${mail}`,
        subject:'Node mailler test',
        html:`<br><br><br><p>Doğrulama Kodunux <b>${code}</b></p><h5>Jobzones Hoşgeldiniz</h5>`
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

module.exports = { verifiFunc };
