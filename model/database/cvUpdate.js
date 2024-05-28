let sql = require("mssql");

let cvUpdateFunc = (cv,userID) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userInformation
    SET cv = '${cv}'
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

module.exports = { cvUpdateFunc }



