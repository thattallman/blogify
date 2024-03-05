const BLOG = require("../Models/blog");
const USER = require("../Models/user");
const COMMENT = require("../Models/comments");

function handleSubmitBlog(req, res){
    const { title, body } = req.body;
    BLOG.create({
      title: title,
      body: body,
      createdBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });
    res.redirect("/");
  }
  async function handleGetById(req, res){
    const id = req.params.id;
    try {
      const blogOfId = await BLOG.find({ _id: id });
      const obj = await USER.find({ _id: blogOfId[0].createdBy });
      const comments = await COMMENT.find({blogId : id});
      res.render("viewBlog", {
        blogDetails: blogOfId[0],
        userDetails: obj[0].fullName,
        comments: comments,
      });
    } catch (error) {
      console.log("Error loading the data ");
      res.render("viewBlog");
    }
  }

  async  function hadlePostComment (req, res){
    const blogId = req.params.id;
    const { comment } = req.body;
    try {
      const userDetails = await USER.find({ _id: req.user._id });
      await COMMENT.create({
        blogId: blogId,
        comment: comment,
        fullName: userDetails[0].fullName,
        profileImageUrl: userDetails[0].profileImageUrl,
      });
      res.redirect(`/blog/viewBlog/${blogId}`);
    } catch (error) {
      console.log("Error uploading to the database");
    }
  }
module.exports = {handleSubmitBlog, handleGetById, hadlePostComment }