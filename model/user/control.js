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

let login = (data)=>{
    
return new Promise((resolve,reject)=>{

    sql.query(`SELECT userID FROM [user] WHERE email = '${data.email}' AND password = '${data.password}'`).then(data =>{
      if(data.recordset.length >= 1) resolve(data.recordset[0].userID)
        else resolve(0)
        
    }).catch(err=>{
        resolve(0)
        console.group(err)
    })
}).catch(err=>{
    console.log(err)
    return 0
})
}


let conrolUSERNAME = (username)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`SELECT COUNT(*) AS count FROM [user] WHERE username = '${username}' `).then(data=>{
            resolve(data.recordset[0].count)
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


let userTypeControl = (userID)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`select * from [user] where userID = '${userID}'`).then((data)=>{
            resolve(data.recordset[0].type)
        }).catch((err)=>{
            console.log(err)
            resolve(404)
        })
    }).catch((error)=>{
        console.log(error)
        return 404
    })
}
module.exports = { conrolUSER, login, conrolUSERNAME, userTypeControl }