let sql = require('mssql')

let candidatesGET = (data)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`
        DECLARE @genderFilter INT;
        SET @genderFilter = ${Number(data.gender)};
        
        DECLARE @workmodeFilter NVARCHAR(MAX);
        SET @workmodeFilter = N'${data.mode}';
        
        DECLARE @city NVARCHAR(100);
        SET @city = N'${data.location}';
        
        DECLARE @qualiftion NVARCHAR(MAX);
        SET @qualiftion = N'${data.qualification}';

        DECLARE @department NVARCHAR(100);
        SET @department = N'${data.department}';
        
        DECLARE @startDate INT;
        SET @startDate = ${Number(data.agemin)};  -- Başlangıç tarihi buraya girin
        
        DECLARE @endDate INT;
        SET @endDate = ${Number(data.agemax)};  -- Bitiş tarihi buraya girin
        
            DECLARE @date DATE;
        SET @date = '${data.date}'; 

              DECLARE @date2 DATE;
        SET @date2 = '${data.date2}'; 

        DECLARE @exprenceTime NVARCHAR(MAX);
SET @exprenceTime = '${data.experiencetime}'; 
        
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
        

            and 
            (
                @qualiftion IS NULL OR @qualiftion = '' OR @qualiftion = '[]' OR
                EXISTS (
                    SELECT 1
                    FROM OPENJSON(@qualiftion) AS filters
                    WHERE EXISTS (
                        SELECT 1
                        FROM job as wm
                        WHERE t2.qualdegree = filters.value
                    )
                )
            )
        
            AND ( @department IS NULL OR @department = '' OR t2.department = @department )

            AND ( @exprenceTime IS NULL OR @exprenceTime = '' OR t2.experienceTime >= @exprenceTime )
             
        
 AND (
        DATEDIFF(YEAR, t2.birth, GETDATE()) BETWEEN @startDate AND @endDate
        OR @startDate = '' 
        OR @startDate IS NULL 
        OR @endDate = '' 
        OR @endDate IS NULL
    )

      AND (
      (j.date BETWEEN @date AND @date2 )
      OR
      (@date = '' OR @date2 = '')
      OR
      (@date IS NULL OR @date2 IS NULL)
      
      
      );



     
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