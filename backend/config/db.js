const mongoose = require("mongoose");

//Connexion à MongoDB en utilisant une variable d'environnement
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connecté");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
