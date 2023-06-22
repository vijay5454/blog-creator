const express = require("express");
const { protectedRoute } = require("../middlewares/authMiddleware");
const {
  createBlog,
  getMyBlogs,
  updateBlog,
  getSpecificBlog,
  getAllBlogsSkeleton,
  deleteUserBlog,
} = require("../controllers/BlogController");

const BlogRoutes = express.Router();

BlogRoutes.post("/create", protectedRoute, createBlog);
BlogRoutes.post("/:id", protectedRoute, updateBlog);
BlogRoutes.get("/all", getAllBlogsSkeleton);
BlogRoutes.get("/all/:id", getSpecificBlog);
BlogRoutes.delete("/:id", protectedRoute, deleteUserBlog);
BlogRoutes.get("/me", protectedRoute, getMyBlogs);

module.exports = {
  BlogRoutes,
};
