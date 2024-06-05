let sql = require('mssql')


let jobUpdate = (data)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`UPDATE [dbo].[job]
        SET [title] = '${data.title}'
           ,[requirements] = '${data.requirements}'
           ,[obligations] = '${data.obligations}'
           ,[personalnumber] = '${data.personalnumber}'
           ,[finish] = '${data.finish}'
           ,[gender] = '${data.gender}'
           ,[qualdegree] = '${data.qualdegree}'
           ,[careerlevel] = '${data.careerlevel}'
           ,[workmode] = '${data.workmode}'
           ,[category] = '${data.category}'
           ,[departmen] = '${data.departmen}'
           ,[agemin] = '${data.agemin}'
           ,[agemax] = '${data.agemax}'
           ,[staj] = '${data.staj}'
           ,[salary] = '${data.salary}'
           ,[city] = '${data.city}'
           ,[coordinate] = '${data.coordinate}'
           ,[dayendtimework] = '${data.dayendtimework}'
           ,[commentpermit] = '${data.commentpermit}'
           ,[applicationpermit] = '${data.applicationpermit}'
           ,[urgent] = '${data.urgent}'
           ,[taking] = '${data.taking}'

      WHERE userID = '${data.userID}' AND jobID = '${data.jobID}'
     `).then((rsul)=>{
        if(rsul.rowsAffected == 0) resolve(0)
         else resolve(1)
        
     }).catch(err=>{
        console.log(err)
        resolve(0)
     })
    }).catch((error)=>{
        console.log(error)
        return 0
    })
}


module.exports = {jobUpdate}
