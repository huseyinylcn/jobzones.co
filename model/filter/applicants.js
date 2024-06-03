let sql = require('mssql')

let candidatesGET = (data)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`
        DECLARE @genderFilter INT;
        SET @genderFilter = ${Number(data.gender)};
        
        DECLARE @workmodeFilter NVARCHAR(MAX);
        SET @workmodeFilter = '${data.mode}';
        
        DECLARE @city NVARCHAR(100);
        SET @city = '${data.location}';
        
        DECLARE @qualiftion NVARCHAR(100);
        SET @qualiftion = '${data.qualification}';

        DECLARE @department NVARCHAR(100);
        SET @department = '${data.department}';
        
        DECLARE @startDate DATE;
        SET @startDate = '${data.agemin}';  -- Başlangıç tarihi buraya girin
        
        DECLARE @endDate DATE;
        SET @endDate = '${data.agemax}';  -- Bitiş tarihi buraya girin
        
            DECLARE @jobDateThreshold DATE;
        SET @jobDateThreshold = '${data.datepost}'; 
        
        SELECT 
            t1.username,
            t1.email,
            t2.*
        FROM 
            [user] t1
        JOIN
            candidates t2 ON t1.userID = t2.userID
        JOIN
            jobdate j ON j.userID = t2.userID
        WHERE 
            t1.type = 0 
            AND t2.views = 1 
        
            AND (
                (@genderFilter = 2) OR
                (t2.gender = @genderFilter)
            )
        
            AND (
                @workmodeFilter IS NULL OR @workmodeFilter = '' OR @workmodeFilter = '[]' OR
                EXISTS (
                    SELECT 1
                    FROM OPENJSON(@workmodeFilter) AS filter
                    WHERE EXISTS (
                        SELECT 1
                        FROM OPENJSON(t2.workmode) AS wm
                        WHERE wm.value = filter.value
                    )
                )
            )
            AND ( @city IS NULL OR @city = '' OR t2.city = @city )
        
            AND ( @qualiftion IS NULL OR @qualiftion = '' OR t2.qualdegree = @qualiftion )
        
            AND ( @department IS NULL OR @department = '' OR t2.department = @department )
             
            AND t2.birth BETWEEN @startDate AND @endDate
        
             AND j.date > @jobDateThreshold;
        `).then(data=>{
            resolve(data.recordset)
        }).catch(err=>{
            console.log(err)
            resolve(0)
        })
    }).catch(error=>{
        return 0
    })
}



module.exports = {candidatesGET}