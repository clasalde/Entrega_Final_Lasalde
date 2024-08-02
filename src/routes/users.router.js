const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const UsersController = require("../controller/users.controller.js");
const usersController = new UsersController();




router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);

router.delete("/:uid", usersController.deleteUserById);
router.delete("/", usersController.deleteInactiveUsers);

module.exports = router;