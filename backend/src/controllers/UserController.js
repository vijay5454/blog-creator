const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jsonWT = require("jsonwebtoken");

//generate token
const generateToken = (id) => {
  return jsonWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const response = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const { _id } = response;
    res.status(200).json({
      message: "User created successfully!",
      token: generateToken(_id),
    });
  } catch (error) {
    res.status(500);
    throw new Error("Can't able to create user");
  }
});

//login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const user = await UserModel.findOne({ email });
  const compareFlag = await bcrypt.compare(password, user.password);
  if (user && compareFlag) {
    res.status(200).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//getBlogs for a User
const getmyBlogs = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Okay will get it",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getmyBlogs,
};
