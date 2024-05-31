let sql = require('mssql');

let record = (data) => {
    return new Promise((resolve, reject) => {
     
        const request = new sql.Request();
        request.input('userID', sql.NVarChar, data.userID)
               .input('password', sql.NVarChar, data.password)
               .input('email', sql.NVarChar, data.email)
               .input('username', sql.NVarChar, data.username)
               .input('type', sql.Bit, data.type)
               .query('INSERT INTO [user] (userID, password, email, username, type) VALUES (@userID, @password, @email, @username, @type)')
               .then(result => {
                    resolve(1);
               })
               .catch(error => {
                    reject(0);
               });
    });
};

let recordCandidatesInfoFUNC = (userID)=>{
     return new Promise((resolve, reject)=>{
          sql.query(`
          INSERT INTO [dbo].[candidates]
                     ([fullname]
                     ,[gender]
                     ,[birth]
                     ,[category]
                     ,[cvpath]
                     ,[profileIMG]
                     ,[bannerIMG]
                     ,[phone]
                     ,[adres]
                     ,[city]
                     ,[coordinate]
                     ,[photos]
                     ,[videoURL]
                     ,[social]
                     ,[education]
                     ,[qualdegree]
                     ,[careerlevel]
                     ,[experience]
                     ,[language]
                     ,[reference]
                     ,[hobby]
                     ,[workmode]
                     ,[salary]
                     ,[dayandtimework]
                     ,[userID])
               VALUES
                     (
                      ''
                     ,1
                     ,''
                     ,''
                     ,''
                     ,'/img/default.jpg'
                     ,''
                     ,''
                     ,''
                     ,''
                     ,''
                     ,'[]'
                     ,''
                     ,'[]'
                     ,'[]'
                     ,''
                     ,''
                     ,'[]'
                     ,'[]'
                     ,'[]'
                     ,'[]'
                     ,'[]'
                     ,'[]'
                     ,'[]'
                     ,'${userID}'
                    )`).then((data)=>{
                         resolve(1)
                    }).catch(err=>{
                         console.log(err)
                         resolve(0)
                    })
     }).catch((err)=>{
          console.log(err)
          return 0
     })
}

module.exports = { record,recordCandidatesInfoFUNC };
