const express = require("express");

const {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

// POST a new user
router.post("/signup", signupUser);

// LOGIN
router.post("/login", loginUser);

// GET all users
router.get("/", getUsers);

// GET a single user
router.get("/:id", getUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

module.exports = router;
