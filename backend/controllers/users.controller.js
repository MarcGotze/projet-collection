const bcrypt = require("bcrypt");
const UsersModel = require("../models/users.model");

module.exports.setUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: "Merci de saisir un pseudonyme." });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({ message: "Merci de saisir un mot de passe." });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({ message: "Merci de saisir une adresse e-mail." });
    return;
  }
  if (!req.body.location) {
    res.status(400).json({ message: "Merci de saisir une localisation." });
    return;
  }

  const user = await UsersModel.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    location: req.body.location,
  });
  res.status(200).json(user);
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.getUsers = async (req, res) => {
  const users = await UsersModel.find();
  res.status(200).json(users);
};

module.exports.editUser = async (req, res) => {
  const user = await UsersModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Ce compte n'éxiste pas." });
  }

  // Supprimer les champs username et email de la mise à jour
  if (req.body.username || req.body.email) {
    delete req.body.username;
    delete req.body.email;
  }

  // Vérifier si le champ password est présent dans la requête
  if (req.body.password) {
    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  const updateUser = await UsersModel.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};

module.exports.deleteUser = async (req, res) => {
  const user = await UsersModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Ce compte n'éxiste pas." });
  }

  await user.deleteOne();
  res.status(200).json("Compte supprimé.");
};
