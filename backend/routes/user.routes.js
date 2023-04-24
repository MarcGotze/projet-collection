const express = require("express");
const {
  setUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

//C
router.post("/register", setUser);

//R
router.get("/users", getUsers);

//U
router.put("/:id", editUser);

//D
router.delete("/:id", deleteUser);

//LOGIN IN WORK

module.exports = router;
