 let sql = require('mssql')

let UserIDget = (mail)=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT userID FROM users where email ='${mail}'`).then((data)=>{
        resolve((data.recordset)[0].userID)
    }).catch(error=>{
        reject(error)
      
    })
})
}

module.exports = {UserIDget}