const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// static signup method
userSchema.statics.signup = async function (
  data
) {

  // Je propose de faire la valid des champs en front

  // validation
  // if (!data.username || !data.password || !data.email || !data.location) {
  //   throw Error("Tous les champs doivent être remplis");
  // }
  // if (!validator.isAlphanumeric(data.username)) {
  //   throw Error("Pseudonyme non valide");
  // }
  // if (!validator.isStrongPassword(data.password)) {
  //   throw Error("Mot de passe pas assez fort");
  // }
  // if (!validator.isEmail(data.email)) {
  //   throw Error("Email non valide");
  // }
  // if (!validator.isAlpha(data.location)) {
  //   throw Error("Localisation non valide");
  // }

  
  const emailExists = await this.findOne({email :data.email});
  const usernameExists = await this.findOne({username : data.userName});

  if (emailExists || usernameExists) {

    throw new Error("Email ou pseudonyme déjà utilisé");
  }

  // Hashage mdp fonctionnel
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  // Création utilisateur fonctionnelle
  const user = await this.create({ username : data.userName, password: hash, email : data.email, location : data.location });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {

  // if (!email || !password) {
  //   throw Error("Tous les champs doivent être remplis");
  // }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Email incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
