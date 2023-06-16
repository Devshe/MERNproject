const express = require("express");
const postRouter = express.Router();

const {
  getPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} = require("../postController");

postRouter.get("/getPosts", getPosts);
postRouter.get("/getSinglePost/:id", getSinglePost);
postRouter.post("/createPost", createPost);
postRouter.delete("/deletePost/:id", deletePost);
postRouter.put("/updatePost/:id", updatePost);

module.exports = postRouter;
