let sql = require("mssql");

let update = (userID, data) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
         UPDATE [dbo].[candidates]
SET fullname = '${data.fullname}',
    gender = '${data.gender}',
    birth = '${data.birth}',
    job = '${data.job}',
    views = '${data.views}',
    department = '${data.department}',
    category = '${data.category}',
    phone = '${data.phone}',
    adres = '${data.adres}',
    city = '${data.city}',
    coordinate = '${data.coordinate}',
    videoURL = '${data.videoURL}',
    social = '${data.social}',
    education = '${data.education}',
    qualdegree = '${data.qualdegree}',
    careerlevel = '${data.careerlevel}',
    experience = '${data.experience}',
    language = '${data.language}',
    reference = '${data.reference}',
    hobby = '${data.hobby}',
    workmode = '${data.workmode}',
    salary = '${data.salary}',
    dayandtimework = '${data.dayandtimework}'
WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};
let updateProfileIMG = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
          UPDATE [dbo].[candidates]
 SET profileIMG = '${IMGpath}'
 WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updateBannerIMG = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
          UPDATE [dbo].[candidates]
 SET bannerIMG = '${IMGpath}'
 WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updateimgAll = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
          UPDATE [dbo].[candidates]
 SET photos = '${IMGpath}'
 WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updatecv = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
          UPDATE [dbo].[candidates]
 SET cvpath = '${IMGpath}'
 WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updateJobDate = (userID) => {
  return new Promise((resolve, reject) => {
    sql.query(`
    UPDATE [dbo].[jobdate]
   SET [date] = GETDATE()
 WHERE userID = '${userID}'
    `).then(data=>{
      resolve(1)
    }).catch(err=>{
      resolve(0)
    })
  }).catch(err=>{
    return 0
  })
};

//! Burada employer olanlar var
let updateEmployer = (userID, data) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
          UPDATE [dbo].[employer]
   SET [fullname] = '${data.fullname}'
      ,[sector] = '${data.sector}'
      ,[aboutshort] = '${data.aboutshort}'
      ,[phone] = '${data.phone}'
      ,[city] = '${data.city}'
      ,[weburl] = '${data.weburl}'
      ,[history] = '${data.history}'
      ,[size] = '${data.size}'
      ,[videourl] = '${data.videourl}'
      ,[social] = '${data.social}'
      ,[coordinate] = '${data.coordinate}'
      ,[views] = '${data.views}'
      ,[commentpermit] = '${data.commentpermit}'
 WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updateProfileIMGEmployer = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
             UPDATE [dbo].[employer]
    SET profileIMG = '${IMGpath}'
    WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log("fdsfd", err);
        resolve(0);
      });
  }).catch((err) => {
    console.log("jhkjnk", err);
    return 0;
  });
};

let updateBannerIMGEmployer = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
             UPDATE [dbo].[employer]
    SET bannerIMG = '${IMGpath}'
    WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

let updateimgAllEmployer = (userID, IMGpath) => {
  return new Promise((resolve, reject) => {
    sql
      .query(
        `
             UPDATE [dbo].[employer]
    SET photos = '${IMGpath}'
    WHERE userID = '${userID}'`
      )
      .then((data) => {
        resolve(1);
      })
      .catch((err) => {
        console.log(err);
        resolve(0);
      });
  }).catch((err) => {
    console.log(err);
    return 0;
  });
};

module.exports = {
  update,
  updateProfileIMG,
  updateBannerIMG,
  updateimgAll,
  updatecv,
  updateEmployer,
  updateProfileIMGEmployer,
  updateBannerIMGEmployer,
  updateimgAllEmployer,
  updateJobDate
};
