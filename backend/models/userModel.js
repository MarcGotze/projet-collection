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
  username,
  password,
  email,
  location
) {
  // validation
  if (!username || !password || !email || !location) {
    throw Error("Tous les champs doivent être remplis");
  }
  if (!validator.isAlphanumeric(username)) {
    throw Error("Pseudonyme non valide");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Mot de passe pas assez fort");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email non valide");
  }
  if (!validator.isAlpha(location)) {
    throw Error("Localisation non valide");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists || usernameExists) {
    throw Error("Email ou pseudonyme déjà utilisé");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash, email, location });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
