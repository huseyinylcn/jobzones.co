let sql = require("mssql");

let userInfoCreateFunc = (token, typeID,fullname) => {
  return new Promise((resolve, reject) => {
    sql.query( ` 
    INSERT INTO userInformation (userID, education, tales, photo, fullName, extraPhoto)
    VALUES ('${token}', '[]', '[]', '/ProfilPicture/profileImg/default.jpeg', '${fullname}', '[]');
    
    INSERT INTO [dbo].[userPreference] 
        (userID, departman, mode, datePosted, qualification, experience)
    VALUES
        ('${token}', '', '[]', '', '', 0);
     `).then((data) => {
        resolve(1);
      })
      .catch((error) => {
        reject(0);
      });
  });
};
 
module.exports = { userInfoCreateFunc };
