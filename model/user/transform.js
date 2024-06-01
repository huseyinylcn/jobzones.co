let {conrolUSERNAME} = require("./control");

function generateRandomNumber(user) {
  return new Promise((resolve, reject) => {
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let newUser = user + randomNumber.toString();
    resolve(newUser);
  });
}
let userTransformFunc = (username) => {
    return new Promise(async (resolve, reject) => {
      let cleanedFullName = username.replace(/[^a-zA-Z0-9]/g, "");
      let lowerCaseFullName = cleanedFullName.toLowerCase();
  
      async function checkAndResolve(username) {
        let data = await conrolUSERNAME(username);
        if (data) {
          let newUsername = await generateRandomNumber(lowerCaseFullName);
          return checkAndResolve(newUsername);
        } else {
          resolve(username);
        }
      }
  
      checkAndResolve(lowerCaseFullName);
    });
  };
  
  module.exports = { userTransformFunc };
