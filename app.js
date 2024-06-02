const express = require("express");
let session = require('express-session')

const app = express();
const path = require("path");
const passport = require("passport");

const bodyParser = require("body-parser");
const sql = require("mssql");
require("dotenv").config();
require('./router/usersControl/auth')



const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_OPTIONS_ENCRYPT === "true",
    enableArithAbort: true
  },
};
app.use(session({
  secret: '739f6d87048e4b3951d9d59acfaf441dd0a45fa43d6f4df9fb89b4659ea10afb',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null },
  
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

const routerMain = require("./router/main");
const routerSignin = require("./router/usersControl/signin");
const routerLogin = require("./router/usersControl/login");
const candidates = require("./router/profile/candidates");
const employer = require("./router/profile/employer");





sql.connect(config).then(() => {
    app.use("/signin", routerSignin);
    app.use("/login", routerLogin);
    app.use("/candidates", candidates);
    app.use("/employer", employer);

    app.use("/", routerMain);

});


let port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${3000}`);
});
