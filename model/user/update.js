let sql = require('mssql')

let update = (userID,data)=>{
     console.log(data)
    return new Promise((resolve, reject)=>{
         sql.query(`
         UPDATE [dbo].[candidates]
SET fullname = '${data.fullname}',
    gender = '${data.gender}',
    birth = '${data.birth}',
    category = '${data.category}',
    cvpath = '${data.cvpath}',
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
WHERE userID = '${userID}'`).then((data)=>{
                        resolve(data)
                   }).catch(err=>{
                        console.log(err)
                        resolve(0)
                   })
    }).catch((err)=>{
         console.log(err)
         return 0
    })
}
let updateProfileIMG = (userID,IMGpath)=>{
     return new Promise((resolve,reject)=>{
          sql.query(`
          UPDATE [dbo].[candidates]
 SET profileIMG = '${IMGpath}'
 WHERE userID = '${userID}'`).then(data=>{
     resolve(1)
 }).catch(err=>{
     console.log(err)
     resolve(0)
 })
     }).catch(err=>{
          console.log(err)
          return 0
     })

}

let updateBannerIMG = (userID,IMGpath)=>{
     return new Promise((resolve,reject)=>{
          sql.query(`
          UPDATE [dbo].[candidates]
 SET bannerIMG = '${IMGpath}'
 WHERE userID = '${userID}'`).then(data=>{
     resolve(1)
 }).catch(err=>{
     console.log(err)
     resolve(0)
 })
     }).catch(err=>{
          console.log(err)
          return 0
     })

}


module.exports = { update ,updateProfileIMG, updateBannerIMG }