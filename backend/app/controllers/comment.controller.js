const comment = require("../models/index").comment;
const user = require("../models/index").user;
const { ObjectId } = require("mongodb");

exports.addComment = async (req, res) => {
  req.body.author = new ObjectId(req.body.author);
  comment
    .create(req.body)
    .then(async (comment) => {
      user
        .findByIdAndUpdate(
          req.body.user,
          { $push: { comments: comment._id } },
          { new: true }
        )
        .then(() => res.send({ message: "Comment added", status: true }));
    })
    .catch((err) =>
      res.status(501).send({ message: err.message, status: false })
    );
};

exports.getComment = async (req, res) => {
  try {
    const comments = await comment
      .find({})
      .populate("author", "username image")
      .populate({
        path: "replies",
        populate: { path: "author", select: "username image" },
        match: { parentComment: { $exists: false } },
      });
    res.send({ data: comments });
  } catch (error) {
    return res.status(501).send({ message: error.message, status: false });
  }
};

exports.addReply = async (req, res) => {
  try {
    const parentComment = await comment.findById(req.params.commentId);

    if (!parentComment) {
      return res
        .status(404)
        .send({ message: "Parent Comment Not Found", status: false });
    }
    req.body.author = new ObjectId(req.body.author);
    const newComment = await comment.create(req.body);
    parentComment.replies.push(newComment._id);
    await parentComment.save();
    return res.send({ message: "reply comment added", status: true });
  } catch (err) {
    return res.status(501).send({ message: err.message, status: false });
  }
};
