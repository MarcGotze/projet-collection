const express = require("express");
const {
  setUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

//C
router.post("/", setUser);

//R
router.get("/", getUsers);

//U
router.put("/:id", editUser);

//D
router.delete("/:id", deleteUser);

module.exports = router;
