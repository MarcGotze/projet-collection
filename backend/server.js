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

//Appel des routes users
app.use("/users", require("./routes/users.routes"));

//Lancement du serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
