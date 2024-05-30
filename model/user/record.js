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

module.exports = { record };
