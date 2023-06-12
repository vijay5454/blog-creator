const express = require("express");
const {
  registerUser,
  loginUser,
  getmyBlogs,
} = require("../controllers/UserController");

const UserRoutes = express.Router();

UserRoutes.post("/", registerUser);
UserRoutes.post("/login", loginUser);

module.exports = UserRoutes;
