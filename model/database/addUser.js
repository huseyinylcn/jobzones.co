let sql = require("mssql");
let userInfoCreate = require('./userInfoCreate')

let addUserFunc = (token, username, email, password, typeID,fullanme) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `insert into users(userID, username, email, userpassword, accountOpen, employers) values
    ('${token}','${username}','${email}','${password}',getdate(),${typeID})`
      )
      .then((data) => {
        
          userInfoCreate.userInfoCreateFunc(token,typeID,fullanme).then((veri)=>{
            if(veri){
              resolve(1);
            }
            else{
              resolve(0)
            }
          }).catch(err=>{
            console.log(err)
          })
        
      
        
      })
      .catch((error) => {
        reject(0);
      });
  })
};

module.exports = { addUserFunc };
