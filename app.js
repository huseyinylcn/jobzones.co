const express = require("express");
let session = require('express-session')
let oyun = 124682
let ekmek = 11
const app = express();
const path = require("path");
const passport = require("passport");


let xx = 13
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
const routerdashboard = require("./router/dashboard/main");
const routerresumes = require("./router/dashboard/resumes");
const routeremployers = require("./router/employers/main");
const routercandidates = require("./router/candidates/main");


sql.connect(config).then(() => {
    app.use("/signin", routerSignin);
    app.use("/login", routerLogin);
    app.use("/candidates", routercandidates);
    app.use("/dashboard", routerdashboard);
    app.use("/dashboard/resumes", routerresumes);
    app.use("/employers", routeremployers);
    app.use("/candidates", routercandidates);


    app.use("/", routerMain);

});


let port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${3000}`);
});
