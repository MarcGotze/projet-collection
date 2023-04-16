const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller.js");

router.post("/users", userController.createUser);

module.exports = router;
