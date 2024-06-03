let sql = require('mssql')

let proprietorGET = (data)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`
        DECLARE @city NVARCHAR(100);
        SET @city = '${data.location}';
         
         DECLARE @sector NVARCHAR(100);
        SET @sector = '${data.sector}';
        
         DECLARE @size NVARCHAR(100);
        SET @size = '${data.size}';
        
        SELECT 
            t1.username,
            t1.email,
            t2.*
        FROM 
            [user] t1
        JOIN
            employer t2 ON t1.userID = t2.userID
        
        WHERE 
            t1.type = 1 
            AND t2.views = 1 
            AND ( @city IS NULL OR @city = '' OR t2.city = @city )
            AND ( @sector IS NULL OR @sector = '' OR t2.sector = @sector )
            AND ( @size IS NULL OR @size = '' OR t2.size = @size )
        
        
        `).then(data=>{
            resolve(data.recordset)
        }).catch(err=>{
            resolve(0)
        })
    }).catch(error=>{
        return 0
    })
}




module.exports = {proprietorGET}