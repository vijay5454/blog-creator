const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const jsonWT = require("jsonwebtoken");

const protectedRoute = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      //Verify given Web token
      const decodedValue = await jsonWT.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decodedValue.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(404);
      throw new Error("User not Found!");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Token not Found");
  }
});

module.exports = {
  protectedRoute,
};
