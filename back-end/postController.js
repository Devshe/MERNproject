const Post = require("./Model/post.js");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(post);
};

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
};
