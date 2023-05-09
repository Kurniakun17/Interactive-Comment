const comment = require("../models/index").comment;
const user = require("../models/index").user;

exports.addComment = async (req, res) => {
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
      .populate("author", "username image");
    res.send({ data: comments });
  } catch (error) {
    res.status(501).send({ message: error.message, status: false });
  }
};
