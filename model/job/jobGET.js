let sql = require("mssql");

let jobGETfUnch = (jobID) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `SELECT t2.email,t2.username, t2.type ,t1.*
    FROM [job] t1
	join
	[user] t2 on t2.userID =  t1.userID
    WHERE t1.jobID = '${jobID}'`
      )
      .then((data) => {
        resolve(data.recordset);
      })
      .catch((err) => {
        resolve(0);
      });
  }).catch((error) => {
    return 0;
  });
};

module.exports = { jobGETfUnch };
