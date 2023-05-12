const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new user
const signupUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.signup(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  res.status(200).json(user);
};

// delete an user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  res.status(200).json(user);
};

// update an user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...otherFields } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body = { password: hashedPassword, ...otherFields };
  }

  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ error: "Cet utilisateur n'éxiste pas" });
  }

  res.status(200).json(user);
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
