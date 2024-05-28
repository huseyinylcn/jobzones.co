let sql = require('mssql')

let loginControl = (mail,password)=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT ISNULL((SELECT userID FROM users WHERE email = '${mail}' AND userpassword = '${password}'), 0) AS userID;
    `).then((data)=>{
        resolve((data.recordset)[0].userID)
    }).catch(error=>{
        reject(0)
      
    })
})
}

module.exports = {loginControl}