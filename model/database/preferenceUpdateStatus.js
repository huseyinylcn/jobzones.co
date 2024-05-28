let sql = require("mssql");



let preferenceDatePosted = (userID) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userPreference
    SET datePosted = GETDATE()
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


let preferenceDepartman = (userID,departman,mode) => {
  return new Promise((resolve, reject) => {

    sql
      .query(
        `UPDATE userPreference
    SET departman = N'${departman}', mode = '${mode}'
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


module.exports = { preferenceDatePosted,preferenceDepartman }



