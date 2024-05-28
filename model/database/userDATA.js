let sql = require('mssql')

let userDATAFunc = (token)=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT 
    uc.*, 
    CONVERT(varchar, uc.birth, 23) AS birth2,
    u.username, 
    u.email,
    u.employers,
    up.*
FROM 
    [job].[dbo].[userInformation] uc
JOIN 
    [job].[dbo].[users] u ON uc.userID = u.userID
JOIN 
    [job].[dbo].[userPreference] up ON u.userID = up.userID
WHERE 
    uc.userID = '${token}';
`).then((data)=>{
        resolve((data.recordset)[0])
    }).catch(error=>{
        reject(error)
      
    })
})
}

module.exports = {userDATAFunc}