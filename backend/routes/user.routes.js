const express = require("express");
const {
  setUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.route("/").post(setUser).get(getUsers);

router.route("/:id").put(editUser).delete(deleteUser);

module.exports = router;
