const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const { checkUser } = require("./Middlewares/userAuth");
const blogRouter = require("./routes/blog");
const BLOG = require("./Models/blog");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongo db connected "));
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkUser("token"));
app.get("/", async (req, res) => {
  try {
    const userData = await BLOG.find();
    res.render("home", { user: req.user, blogs: userData });
  } catch (error) {
    console.log("No entries of blogs by the user found in the data base ");
    res.render("home", { user: req.user });
  }
});
app.use("/user", userRouter);
app.use("/blog", blogRouter);
const PORT = process.env.PORT || 8000;
console.log("port is " + process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server started on PORT = ${PORT}`);
});