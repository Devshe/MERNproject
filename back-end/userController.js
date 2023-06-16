const UserModel = require("./Model/user.js");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

//generate tokens
//_id is part of payload
const createToken = (_id) => {
  // 1 - object to represent payload, 2 - secret string only known to server
  //3 is optional lifetime of token
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const users = await UserModel({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    bio: req.body.bio,
    image: req.body.image,
  });
  users.save();
  res.status(201).json(users);
};

const getUserByID = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //passing it as a response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { userName, email, password, name, bio, image } = req.body;
  try {
    const user = await UserModel.signup(
      userName,
      email,
      password,
      name,
      bio,
      image
    );

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //passing it as a response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  loginUser,
  signupUser,
};
