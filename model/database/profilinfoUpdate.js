let sql = require("mssql");

let profileInfoUpdateFunc = (data,userID) => {
  return new Promise((resolve, reject) => {
    
    sql
      .query(
        `UPDATE userInformation
    SET job = '${data.job}', location = N'${data.location}', phone = '${data.phone}', language = '${data.language}' , facebook = '${data.facebook}' , linkedin = '${data.linkedin} ', twitter = '${data.twitter} ', pinteres = '${data.pinterest} ',instagram = '${data.instagram} ',youtube = '${data.youtube}', birth = '${data.birth}', gender = '${data.gender}' 
    where userID = '${userID}'`
      )
      .then((veri) => {
        resolve(1);
      })
      .catch((error) => {
        if(error){
            reject(error);
        }
       
      });
  });
};


let employerInfoUpdateFunc = (tales, data,userID) => {
  return new Promise((resolve, reject) => {
    
    sql
      .query(
        `UPDATE userInformation
    SET fullName = '${data.fullname}', shortAbout = '${data.sorthAbout}', location = N'${data.location}' ,web = '${data.webURL}', tales='${tales}'
    where userID = '${userID}'`
      )
      .then((veri) => {
        resolve(1);
      })
      .catch((error) => {
        if(error){
            reject(error);
        }
       
      });
  });
};


let employerInfo2UpdateFunc = (data,userID) => {
  return new Promise((resolve, reject) => {
    console.log(data.founded)
    sql
      .query(
        `UPDATE userInformation
    SET job = '${data.industry}', size = '${data.companysize}', birth = '${data.founded}' ,facebook = '${data.facebook}', linkedin = '${data.linkedin}',twitter = '${data.tiwiter}', pinteres = '${data.pinterest}',instagram = '${data.instagram}',youtube = '${data.youtube}'
    where userID = '${userID}'`
      )
      .then((veri) => {
        resolve(1);
      })
      .catch((error) => {
        if(error){
            reject(error);
        }
       
      });
  });
};
module.exports = { profileInfoUpdateFunc,employerInfoUpdateFunc, employerInfo2UpdateFunc }



