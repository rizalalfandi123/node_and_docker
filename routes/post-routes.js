const express = require("express");
const postController = require("../controllers/post-controller");

const routers = express.Router();
const protect = require("../middleware/auth-moddleware");

const { getPosts, createPost, deletePost, getPost, updatePost } =
  postController;

routers.route("/").get(protect, getPosts).post(protect, createPost);
routers
  .route("/:id")
  .get(protect, getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = routers;
