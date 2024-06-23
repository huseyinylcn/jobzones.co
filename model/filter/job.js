let sql = require('mssql')


let jobFilter = (info)=>{
    return new Promise((resolve,reject)=>{
     
        sql.query(`
        DECLARE @myCoordinate NVARCHAR(MAX);
        SET @myCoordinate = '${info.coordinate}'
        
        DECLARE @radius_km FLOAT = ${info.r};
        
        
        DECLARE @workmodeFilter NVARCHAR(MAX);
        SET @workmodeFilter = '${info.workmode}';
        
        DECLARE @salary NVARCHAR(MAX);
        SET @salary = '${info.salary}';
        
        DECLARE @qualdegrees NVARCHAR(MAX);
        SET @qualdegrees = '${info.qualdegree}';
        
        DECLARE @careerlevel NVARCHAR(MAX);
        SET @careerlevel = '${info.careerlevel}';
        
        DECLARE @city NVARCHAR(MAX);
        SET @city = N'${info.city}';
        
        DECLARE @category NVARCHAR(MAX);
        SET @category = N'${info.category}';
        
        DECLARE @dates date;
        SET @dates = '${info.date}';

          DECLARE @dates2 date;
        SET @dates2 = '${info.date2}';
        
        DECLARE @staj NVARCHAR(MAX);
        SET @staj = '${info.staj}';
        
        
        
        SELECT 
            t1.*,
            t2.profileIMG,
            t2.social,
            t2.photos,
            t2.videourl
        FROM 
            job t1
       LEFT JOIN [employer] t2 on t1.userID = t2.userID
        WHERE 
        (
                @workmodeFilter IS NULL OR @workmodeFilter = '' OR @workmodeFilter = '[]' OR
                EXISTS (
                    SELECT 1
                    FROM OPENJSON(@workmodeFilter) AS filter
                    WHERE EXISTS (
                        SELECT 1
                        FROM OPENJSON(t1.workmode) AS wm
                        WHERE wm.value = filter.value
                    )
                )
            )and 
            (
                @qualdegrees IS NULL OR @qualdegrees = '' OR @qualdegrees = '[]' OR
                EXISTS (
                    SELECT 1
                    FROM OPENJSON(@qualdegrees) AS filters
                    WHERE EXISTS (
                        SELECT 1
                        FROM job as wm
                        WHERE t1.qualdegree = filters.value
                    )
                )
            )
            AND (
    @careerlevel IS NULL OR 
    @careerlevel = '' OR 
    @careerlevel = '[]' OR
    EXISTS (
        SELECT 1
        FROM job as wm
        WHERE EXISTS (
            SELECT 1
            FROM OPENJSON(@careerlevel) AS filters
            WHERE t1.careerlevel = filters.value
        )
    )
)and
        ( @city IS NULL OR @city = '' OR t1.city = @city )
        and 
        ( @staj IS NULL OR @staj = '' OR t1.staj >= @staj )
        
       AND 

        ( @category IS NULL OR @category = '' OR  t1.category =  @category )
        and 

( @dates IS NULL OR @dates= '' OR @dates < t1.[date] OR t1.[date] =  @dates )
		AND
		

( @dates2 IS NULL OR @dates2= '' OR  @dates2 > t1.[date] OR t1.[date] =  @dates2 )
and
        (
            @myCoordinate = '0,0' OR 
            GEOGRAPHY::Point(CAST(SUBSTRING(t1.coordinate, 1, CHARINDEX(',', t1.coordinate) - 1) AS FLOAT), CAST(SUBSTRING(t1.coordinate, CHARINDEX(',', t1.coordinate) + 1, LEN(t1.coordinate) - CHARINDEX(',', t1.coordinate)) AS FLOAT), 4326).STDistance(GEOGRAPHY::Point(CAST(SUBSTRING(@myCoordinate, 1, CHARINDEX(',', @myCoordinate) - 1) AS FLOAT), CAST(SUBSTRING(@myCoordinate, CHARINDEX(',', @myCoordinate) + 1, LEN(@myCoordinate) - CHARINDEX(',', @myCoordinate)) AS FLOAT), 4326)) / 1000 <= @radius_km
        )
        and 
        ( (JSON_VALUE(t1.salary, '$[0].max')) >= (JSON_VALUE(@salary, '$[0].min'))  )`).then(data=>{

            resolve(data.recordset)
        }).catch((err)=>{
            console.log(err)
            resolve(404)
        })
    }).catch(error=>{
        console.log(error)
        return  404
    })
}

let jobFilterDetay = (jobID)=>{
    return new Promise((resolve,reject)=>{
        sql.query(`
select t1.*, t2.profileIMG, t2.social, t2.photos, t2.videourl , t2.weburl, t2.sector, t2.size
from job t1
join employer t2 on t1.userID = t2.userID  
where t1.jobID = '${jobID}'`)
.then((data)=>{
    resolve(data.recordset[0])
}).catch(err=>{
    console.log(err)
    resolve(0)
})
    }).catch(err=>{
        console.log(err)
        return 0
    })
}



module.exports = { jobFilter, jobFilterDetay }