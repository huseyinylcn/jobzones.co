let sql = require('mssql');

let push = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`
        INSERT INTO [dbo].[job]
           ([title]
           ,[requirements]
           ,[obligations]
           ,[personalnumber]
           ,[finish]
           ,[gender]
           ,[qualdegree]
           ,[careerlevel]
           ,[workmode]
           ,[category]
           ,[departmen]
           ,[agemin]
           ,[agemax]
           ,[staj]
           ,[salary]
           ,[city]
           ,[coordinate]
           ,[dayendtimework]
           ,[date]
           ,[commentpermit]
           ,[applicationpermit]
           ,[urgent]
           ,[taking]
           ,[jobID]
           ,[userID])
     VALUES(
            N'${data.title}'
           ,N'${data.requirements}'
           ,N'${data.obligations}'
           ,N'${data.personalnumber}'
           ,N'${data.finish}'
           ,N'${data.gender}'
           ,N'${data.qualdegree}'
           ,N'${data.careerlevel}'
           ,N'${data.workmode}'
           ,N'${data.category}'
           ,N'${data.departmen}'
           ,N'${data.agemin}'
           ,N'${data.agemax}'
           ,N'${data.staj}'
           ,N'${data.salary}'
           ,N'${data.city}'
           ,N'${data.coordinate}'
           ,N'${data.dayendtimework}'
           ,GETDATE()
           ,N'${data.commentpermit}'
           ,N'${data.applicationpermit}'
           ,N'${data.urgent}'
           ,N'${data.taking}'
           ,N'${data.jobID}'
           ,N'${data.userID}'
        ) -- Kapanış parantezi eklendi
        `).then((result) => {
            resolve(1);
        }).catch(err => {
            console.log(err);
            resolve(0);
        });
    }).catch(error => {
        console.log(error);
        return 0;
    });
};

module.exports = { push };
