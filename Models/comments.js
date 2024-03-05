const { Schema, model } = require("mongoose");
const commentSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
});
const COMMENT = model("comments", commentSchema);
module.exports = COMMENT;
