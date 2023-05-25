const commentModel = require("../models/index").comment;
const userModel = require("../models/index").user;
const { ObjectId } = require("mongodb");

exports.addComment = async (req, res) => {
  try {
    req.body.author = new ObjectId(req.body.author);
    const newCommentRaw = await commentModel.create(req.body);
    if (req.body.parentId) {
      const parentComment = await commentModel.findById(req.body.parentId);
      parentComment.replies.push(newCommentRaw._id);
      parentComment.save();
    }
    const user = await userModel.findById(req.body.author);
    user.comments.push(newCommentRaw._id);
    user.save();
    const newComment = await commentModel
      .findById(newCommentRaw._id)
      .populate("author", "username profilePicture");
    res.send({ data: newComment, status: true });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};

exports.getAllRootComments = async (req, res) => {
  try {
    const data = await commentModel
      .find({})
      .populate("author", "username profilePicture");
    res.send({ data, status: true });
  } catch (error) {
    return res.status(501).send({ message: error.message, status: false });
  }
};

const deleteCommentAndReplies = async (commentId) => {
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    return;
  }

  await commentModel.deleteOne({ _id: commentId });
  await userModel.findByIdAndUpdate(comment.author, {
    $pull: { comments: commentId },
  });

  for (let i = 0; i < comment.replies.length; i++) {
    const replyId = comment.replies[i];
    await deleteCommentAndReplies(replyId);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCommentAndReplies(id);

    res.send({ message: "Komentar berhasil dihapus", status: true });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      return res
        .status(404)
        .send({ message: "comment not found", status: true });
    }
    res.send({ data: comment });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findByIdAndUpdate(
      id,
      {
        $set: { content: req.body.content },
      },
      { new: true }
    );
    if (!comment) {
      return res
        .status(404)
        .send({ message: "comment not found", status: false });
    }
    res.send({ message: comment, status: true });
  } catch (error) {
    return res.status(501).send({ message: error.message, status: false });
  }
};

exports.upvoteScore = async (req, res) => {
  try {
    const { commentId, userId } = req.body;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      res.status(404).send({ message: "comment not found!" });
    }
    if (comment.upvotedBy.includes(userId)) {
      comment.score--;
      comment.upvotedBy.pull(userId);
      comment.save();
      return res.send({
        message: "score has been decreased since user has upvoted it",
      });
    }
    comment.score++;
    comment.upvotedBy.push(userId);
    if (comment.downvotedBy.includes(userId)) {
      comment.score++;
      comment.downvotedBy.pull(userId);
    }
    await comment.save();
    res.send({ message: "score has been increased" });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};

exports.downvoteScore = async (req, res) => {
  try {
    const { commentId, userId } = req.body;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      res.status(404).send({ message: "comment not found!" });
    }
    if (comment.downvotedBy.includes(userId)) {
      comment.score++;
      comment.downvotedBy.pull(userId);
      comment.save();
      return res.send({
        message: "score has been increased since user has downvoted it",
      });
    }
    comment.score--;
    comment.downvotedBy.push(userId);
    if (comment.upvotedBy.includes(userId)) {
      comment.score--;
      comment.upvotedBy.pull(userId);
    }
    await comment.save();
    res.send({ message: "score has been decreased" });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};
