const sql =require('mssql')


let conrolUSER = (username,email)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`
        SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM [user] WHERE email = '${email}') AND EXISTS (SELECT 1 FROM [user] WHERE username = '${username}') THEN 4
        WHEN EXISTS (SELECT 1 FROM [user] WHERE email = '${email}') THEN 2
        WHEN EXISTS (SELECT 1 FROM [user] WHERE username = '${username}') THEN 3
        ELSE 1
    END AS result;
        `).then(data=>{
            resolve(data.recordset[0].result)
        }).catch((err)=>{
            console.log(err)
            reject(0)
        }).finally(()=>{
            reject(0)
        })
    }).catch((err)=>{
        return 0
    })
}

let login = (email,password)=>{
    
return new Promise((resolve,reject)=>{

    sql.query(`SELECT COUNT(*) as count FROM [user] WHERE email = '${email}' AND password = '${password}'`).then(data =>{
        resolve(data.recordset[0].count)
    }).catch(err=>{
        resolve(0)
        console.group(err)
    })
}).catch(err=>{
    console.log(err)
    return 0
})
}

module.exports = { conrolUSER, login }