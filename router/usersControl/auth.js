const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const sql = require("mssql");
const crypto = require("crypto");
let {conrolUSERNAME, conrolUSER, login} =  require('./../../model/user/control')
let {userTransformFunc} =  require('./../../model/user/transform')

let {record , recordCandidatesInfoFUNC, recordEmployerInfoFunc } =  require('./../../model/user/record')


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

      userTransformFunc(profile.displayName).then((username)=>{
        conrolUSER(username,profile.email).then((result)=>{
         let userID =  generateRandomToken(30)
          if(result  == 1){
           let user =  {
              username:username,
              password:profile.id,
              email:profile.email,
              type:Number((request.session.query).employer),
              userID:userID
            }
           record(user).then(data=>{
            if(data == 1){
              if((request.session.query).employer == 0){
              recordCandidatesInfoFUNC(userID).then((data)=>{
                request.type = 0
                done(null,userID);
              })
            }else{
              request.type = 1
              recordEmployerInfoFunc(userID).then((data)=>{
                request.type = 1
                done(null,userID);
              })
            }
             
            }else{
              return
            }
           })


          }else{
            login({email:profile.email,password:profile.id}).then((data)=>{
              console.log('2222')
              done(null,data);
            })
            
          }
        })
      })



    
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
