const bcrypt = require("bcrypt");
const UsersModel = require("../models/users.model");

module.exports.setUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: "Merci de saisir un pseudonyme." });
  }
  if (!req.body.password) {
    res.status(400).json({ message: "Merci de saisir un mot de passe." });
  }
  if (!req.body.mail) {
    res.status(400).json({ message: "Merci de saisir une adresse e-mail." });
  }
  if (!req.body.location) {
    res.status(400).json({ message: "Merci de saisir une localisation." });
  }

  const user = await UsersModel.create({
    username: req.body.username,
    password: req.body.password,
    mail: req.body.mail,
    location: req.body.location,
  });
  res.status(200).json(user);
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

  // Supprimer les champs username et mail de la mise à jour
  if (req.body.username || req.body.mail) {
    delete req.body.username;
    delete req.body.mail;
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
