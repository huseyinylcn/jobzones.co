let sql = require('mssql')


let jobapplicationADD = (info)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`INSERT INTO [dbo].[application]
        ([userID]
        ,[jobID]
        ,[cvpath]
        ,[username])
  VALUES(
        '${info.userID}'
        , '${info.jobID}'
        , '${info.cvpath}'
        , '${info.username}' )`).then(data=>{
            resolve(1)
        }).catch(err=>{
            resolve(0)
        })
    }).catch((error)=>{
        return 0
    })
}

module.exports = {
    jobapplicationADD
}