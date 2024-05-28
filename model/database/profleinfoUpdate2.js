let sql = require("mssql");

let profileInfoUpdate = (talent, fullname,status, userID) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `UPDATE userInformation
    SET tales = '${talent}', fullName = '${fullname}', status = '${status}'
    where userID = '${userID}';
    SELECT photo FROM userInformation WHERE userID = '${userID}';`
      )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(0);
      });
  });
};

module.exports = { profileInfoUpdate }



