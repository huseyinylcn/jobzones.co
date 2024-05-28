let sql = require('mssql')

let usernameControlFunc = (username)=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 1 
        ELSE 0 
    END AS user_exists 
FROM 
    users 
WHERE 
username = '${username}';`).then((data)=>{
        resolve((data.recordset)[0].user_exists)
    }).catch(error=>{
        reject(error)
      
    })
})
}

module.exports = {usernameControlFunc}