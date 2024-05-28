let sql = require("mssql");

let userImgUpdateFunc = (img,userID) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userInformation
    SET photo = '${img}'
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

let userImgCoverUpdateFunc = (img,userID) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userInformation
    SET coverPhoto = '${img}'
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


let extraImg = (array,userID) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userInformation
    SET extraPhoto = '${array}'
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

module.exports = { userImgUpdateFunc,userImgCoverUpdateFunc,extraImg }



