let sql = require('mssql')

let usercandidatesF = (username)=>{
return new Promise((resolve,reject)=>{
    sql.query(`SELECT 
    uc.*, 
    CONVERT(varchar, uc.birth, 23) AS birth2,
    u.username, 
    u.email,
    u.employers
FROM 
    [job].[dbo].[userInformation] uc
JOIN 
    [job].[dbo].[users] u
ON 
    uc.userID = u.userID
WHERE 
    u.username = '${username}';`).then((data)=>{
        resolve((data.recordset))
    }).catch(error=>{
        reject('burda',error)
      
    })
})
}

module.exports = {usercandidatesF}