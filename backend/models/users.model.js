const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate(v) {
        if (!validator.isLength(v, { min: 5, max: 12 }))
          throw new Error("Le pseudonyme doit faire entre 5 et 12 caractères.");
      },
    },
    password: {
      type: String,
      required: true,
      validate(v) {
        if (!validator.isLength(v, { min: 6, max: 20 }))
          throw new Error(
            "Le mot de passe doit faire entre 6 et 20 caractères."
          );
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(v) {
        if (!validator.isEmail(v)) throw new Error("e-mail non valide.");
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

//Fonction qui chercher l'utilisateur dans la DB
usersSchema.statics.findUser = async (email, password) => {
  const user = User.findOne({ email });
  if (!user) throw new Error("Impossible de se connecter.");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Impossible de se connecter.");
  return user;
};

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
