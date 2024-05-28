let sql = require('mssql')

let employersDataGetFunc = ()=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT userInformation.*,users.userID, users.email, users.username
    FROM users
    JOIN userInformation ON users.userID = userInformation.userID
    WHERE users.employers = 1`).then((data)=>{
        resolve((data.recordset))
    }).catch(error=>{
        reject(error)
      
    })
})
}

module.exports = {employersDataGetFunc}