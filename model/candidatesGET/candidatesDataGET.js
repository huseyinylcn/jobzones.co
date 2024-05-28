let sql = require("mssql");

let candidatesDataGETFunc = (username) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `SELECT userInformation.*,users.userID, users.email, users.username
    FROM users
    JOIN userInformation ON users.userID = userInformation.userID
    WHERE userInformation.status=1 and users.employers = 0`
      )
      .then((data) => {
        resolve(data.recordset);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



function yilCikar(yilSayisi) {

    let bugun = new Date();
  
    bugun.setFullYear(bugun.getFullYear() - Number(yilSayisi));
  
    let yil = bugun.getFullYear();
    let ay = String(bugun.getMonth() + 1).padStart(2, '0'); 
    let gun = String(bugun.getDate()).padStart(2, '0');
  
    return `${yil}-${ay}-${gun}`;
  }
let candidatesFilterFunc = (params) => {
  return new Promise((resolve, reject) => {
    let minage = yilCikar(params.agemin)
    let maxage = yilCikar(params.agemax)


   let datepostedMa =  new Date(params.datepostedMax)
   let datepostedMi = new Date(params.datepostedMin)

   let datepostedMin =  `${datepostedMi.getFullYear()}-${String(datepostedMi.getMonth() + 1).padStart(2, '0')}-${ String(datepostedMi.getDate()).padStart(2, '0')}`
   let datepostedMax =`${datepostedMa.getFullYear()}-${String(datepostedMa.getMonth() + 1).padStart(2, '0')}-${ String(datepostedMa.getDate()).padStart(2, '0')}`
   console.log(datepostedMax)
   console.log(datepostedMin)

if(datepostedMax == 'NaN-NaN-NaN'){
  datepostedMax = ''
}
if(datepostedMin == 'NaN-NaN-NaN'){
  datepostedMin = ''
}


 
let gender = Boolean(params.gender)
console.log(gender)

    sql
      .query(
        `
        WITH JoinedTables AS (
          SELECT
              ui.*,
              up.mode,
              up.departman,
              up.datePosted,
              up.qualification,
              up.experience,
              u.employers
          FROM
              userInformation ui
          INNER JOIN
              userPreference up ON ui.userID = up.userID
          INNER JOIN
              users u ON ui.userID = u.userID
      )
      -- JSON sütununu kontrol ediyoruz ve gerekli filtreleri uyguluyoruz.
      SELECT DISTINCT
          jt.*
      FROM
          JoinedTables jt
      WHERE
          (
              EXISTS (
                  SELECT 1
                  FROM OPENJSON(jt.mode) AS j
                  WHERE j.value IN ('${params.mode}', '${params.mode}', '${params.mode}')
              ) OR '${params.mode}' IS NULL OR '${params.mode}' = ''
          )
          AND (
              jt.departman = '${params.departman}' OR '${params.departman}' IS NULL OR '${params.departman}' = ''
          )
          AND (
              jt.datePosted BETWEEN '${datepostedMax}' AND '${datepostedMin}' OR '${datepostedMax}' IS NULL OR '${datepostedMax}' = '' OR '${datepostedMin}' IS NULL OR '${datepostedMin}' = ''
          )
          AND (
              jt.birth BETWEEN '${maxage}' AND '${minage}' OR '${maxage}' IS NULL OR '${maxage}' = '' OR '${minage}' IS NULL OR '${minage}' = ''
          )
          AND (
              jt.qualification = '${params.qualification}' OR '${params.qualification}' IS NULL OR '${params.qualification}' = ''
          )
          AND (
              jt.experience >= '${params.experencTime}' OR '${params.experencTime}' IS NULL OR '${params.experencTime}' = ''
          )
          AND (
              jt.gender = '${params.gender}' OR '${params.gender}' IS NULL OR '${params.gender}' = ''
          )
          AND jt.employers = 0
      
        `
      )
      .then((data) => {
        resolve(data.recordset);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

module.exports = { candidatesDataGETFunc, candidatesFilterFunc };
