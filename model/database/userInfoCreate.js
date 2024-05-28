let sql = require("mssql");

let userInfoCreateFunc = (token, typeID,fullname) => {
  return new Promise((resolve, reject) => {
    sql.query( `insert into userInformation(userID,education,tales,photo,fullName,extraPhoto) values('${token}','[]','[]','/ProfilPicture/profileImg/default.jpeg','${fullname}','[]')`).then((data) => {
        resolve(1);
      })
      .catch((error) => {
        reject(0);
      });
  });
};
 
module.exports = { userInfoCreateFunc };
