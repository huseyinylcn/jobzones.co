let sql = require("mssql");

let aboutEducationUpdateFunc = (about, education, userID) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `UPDATE userInformation
    SET about = '${about}', education = '${education}'
    where userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((error) => {
        reject(0);
      });
  });
};


let aboutUpdateFunc = (about, userID) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `UPDATE userInformation
    SET about = '${about}'
    where userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((error) => {
        reject(0);
      });
  });
};

module.exports = { aboutEducationUpdateFunc,aboutUpdateFunc }



