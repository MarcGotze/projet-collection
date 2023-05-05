const express = require("express");
const connectDB = require("./config/db");
const sessions = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

//Connexion à la DB
connectDB();

//Middleware traitant les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Gestion des autorisations du CORS
app.use(cors());

//Middleware de session
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    name: process.env.SESSION_NAME,
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    },
    resave: false,
  })
);

//Récupération des fichiers statiques via Express
app.use("/static", express.static(__dirname + "/public"));

//Appel des routes users
app.use("/users", require("./routes/user.routes"));

module.exports = app;
