const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const sql = require("mssql");
const crypto = require("crypto");

const userTransform = require("./../../model/transform/userTransform");
const addUser = require("./../../model/database/addUser");
const mailControl = require("./../../model/database/mailControl");
const userID = require("./../../model/database/userID");

let generateRandomToken = (length) => {
  const token = crypto.randomBytes(length).toString("hex");
  return token;
};

const GOOGLE_CLIENT_ID =
  "360272552518-g73lac6amt62mbq4fpocrl3hg0r51li2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/signin/google/redirect",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {

      const queryParams = (request.session.query).employer;
      console.log('Query params:', queryParams);

      let token = generateRandomToken(20);
      mailControl.mailControlFunc(profile.email).then((element) => {
        if (element) {
          userID.UserIDget(profile.email).then((dta) => {
            request.userStatus = "0";
            done(null, dta);
          });
        } else {
          userTransform
            .userTransformFunc(profile.displayName)
            .then((newUsername) => {
              addUser
                .addUserFunc(token, newUsername, profile.email, profile.id,queryParams,profile.displayName)
                .then((data) => {
                  if (data) {
                    request.employer = queryParams;
                    request.userStatus = "1";
                    done(null, token);
                  }
                }).catch((err)=>{
                  console.log('hata kullaıcı ekleme',err)
                })
            }).catch((err)=>{
              console.log('hata yeni  kullanıcı adı oluşturmada',err)
            })
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
