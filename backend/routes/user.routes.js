const express = require("express");
const {
  setUser,
  loginUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.route("/").post(setUser).get(getUsers);
router.route("/login").post(loginUser);
router.route("/:id").put(editUser).delete(deleteUser);

module.exports = router;
