const USER = require("../Models/user");
async function handlePostSignup (req, res) {
    const { fullName, email, password } = req.body;
    await USER.create({
      fullName: fullName,
      email: email,
      password: password,
    });
    return res.redirect("/user/signin");
  }

  async function handlePostSignin(req, res) {
    const { email, password } = req.body;
    try {
      const token = await USER.matchPasswordAndGenerateToken(email, password);
      res.cookie("token", token).redirect("/");
    } catch (error) {
      res.render("signin", { error: "error" });
    }
  }

  module.exports = {handlePostSignup, handlePostSignin}