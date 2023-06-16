const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
