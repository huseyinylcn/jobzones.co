const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const sql = require("mssql");
const crypto = require("crypto");

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
      // const queryParams = (request.session.query).employer;
      console.log(profile);
      done(null, token);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
