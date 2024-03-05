const { Router } = require("express");
const { handlePostSignup, handlePostSignin } = require("../Controller/user");
const router = Router();
router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signup", handlePostSignup);
router.post("/signin", handlePostSignin);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("signin")
});
module.exports = router;