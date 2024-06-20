let sql = require('mssql')


let userGET = (userID)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`SELECT candidates.*, [user].email, [user].username, [user].type
        FROM [user]
        INNER JOIN candidates ON [user].userID = candidates.userID
        where [user].userID = '${userID}'
        `).then(data=>{
            resolve(data.recordset[0])
        }).catch(err=>{
            resolve(0)
        })
    }).catch(err=>{
        return 0
    })
}


let employerGET = (userID)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`SELECT employer.*, [user].email, [user].username, [user].type
        FROM [user]
        INNER JOIN employer ON [user].userID = employer.userID
        where [user].userID = '${userID}'
        `).then(data=>{
            resolve(data.recordset[0])
        }).catch(err=>{
            resolve(0)
        })
    }).catch(err=>{
        return 0
    })
}

module.exports = { userGET,employerGET }