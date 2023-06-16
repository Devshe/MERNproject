const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoute.js");
const postRouter = require("./routes/postRoute.js");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database");
});

//routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
