const asyncHandler = require("express-async-handler");
const BlogModel = require("../models/BlogModel");

//Create Blog
const createBlog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, email, _id } = user;
  const { imageURL, title, blogContent } = req.body;
  if (!name || !email || !_id || !imageURL || !title || !blogContent) {
    res.status(400);
    throw new Error("Please give all required values");
  }
  try {
    const dbResponse = await BlogModel.create({
      author: name,
      user: _id,
      imageURL,
      title,
      blogContent,
    });
    res.status(200).json(dbResponse);
  } catch (error) {
    res.status(500);
    throw new Error("Sorry, Can't able to create Blog");
  }
});

//Get Personal blog
const getMyBlogs = asyncHandler(async (req, res) => {
  const { name, email, _id } = req.user;
  try {
    const response = await BlogModel.find({ user: _id }).select(
      "-__v -updatedAt -user"
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404);
    throw new Error("No Blogs Found!");
  }
});

//Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { name, email, _id } = req.user;
  const blogId = req.params["id"];
  const payload = req.body;
  if (!_id || !blogId || Object.keys(payload).length === 0) {
    res.status(400);
    throw new Error("Bad request: give necessary details");
  }
  const blog = await BlogModel.findById(blogId);
  if (_id.toString() !== blog.user.toString()) {
    res.status(401);
    throw new Error("LoggedIn user doesn't match!");
  }
  const response = await BlogModel.findByIdAndUpdate(blogId, payload, {
    insert: true,
  });
  res.status(200).json(response);
});

//Get all Blogs skeleton
const getAllBlogsSkeleton = asyncHandler(async (req, res) => {
  try {
    const response = await BlogModel.find({}).select(
      "title author blogContent"
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//Get Specific Blog
const getSpecificBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogModel.findById(id).select(
      "imageURL title author blogContent"
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404);
    throw new Error("Can't able to find the blog");
  }
});

module.exports = {
  createBlog,
  getMyBlogs,
  updateBlog,
  getAllBlogsSkeleton,
  getSpecificBlog,
};
