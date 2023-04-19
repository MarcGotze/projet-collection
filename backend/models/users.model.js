const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate(v) {
        if (!validator.isLength(v, { min: 6, max: 20 }))
          throw new Error(
            "Le mot de passe doit être entre 6 et 20 caractères !"
          );
      },
    },
    mail: {
      type: String,
      required: true,
      validate(v) {
        if (!validator.isEmail(v)) throw new Error("E-mail non valide !");
      },
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

//Fonction de hachage de mot de passe avant l'enregistrement dans la base de données
usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("users", usersSchema);
