const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
      unique: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

//static sigup method
userSchema.statics.signup = async function (
  userName,
  email,
  password,
  name,
  bio,
  image
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  //check whether email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use");
  }
  //hashing password - bcrypt
  //salt - random characters getting added to the password before it get hashed
  //generating a salt and hashing together with the password
  const salt = await bcrypt.genSalt(10); //no of charaacters
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    userName,
    email,
    password: hash,
    name,
    bio,
    image,
  });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //check whether email exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  //match the password with hash
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
