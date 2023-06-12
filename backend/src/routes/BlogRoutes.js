const express = require("express");
const { protectedRoute } = require("../middlewares/authMiddleware");
const {
  createBlog,
  getMyBlogs,
  updateBlog,
} = require("../controllers/BlogController");

const BlogRoutes = express.Router();

BlogRoutes.post("/create", protectedRoute, createBlog);
BlogRoutes.post("/:id", protectedRoute, updateBlog);
// BlogRoutes.get("/all", getAllBlogs);
// BlogRoutes.delete("/:id", deleteBlog);
BlogRoutes.get("/me", protectedRoute, getMyBlogs);

module.exports = {
  BlogRoutes,
};
