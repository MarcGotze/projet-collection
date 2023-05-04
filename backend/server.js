const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const app = express();

//Connexion à la DB
connectDB();

//Middleware traitant les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Gestion des erreurs du CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Appel des routes users
app.use("/users", require("./routes/user.routes"));

//Lancement du serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
