const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { handleSubmitBlog,  handleGetById, hadlePostComment} = require("../Controller/blog");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });
const router = Router();
router.get("/submitBlog", (req, res) => {
  res.render("blog", { user: req.user });
});
router.post("/submitBlog", upload.single("coverImageUrl"), handleSubmitBlog);
router.get("/viewBlog/:id", handleGetById);
router.post("/postComment/:id", hadlePostComment);
module.exports = router;
