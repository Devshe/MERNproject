const express = require("express");
const userRouter = express.Router();

const {
  createUser,
  getUsers,
  getUserByID,
  signupUser,
  loginUser,
} = require("../userController.js");

userRouter.post("/createUser", createUser);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser/:id", getUserByID);

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

module.exports = userRouter;
