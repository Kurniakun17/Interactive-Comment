const comment = require('../models/index').comment
const user = require('../models/index').user

exports.addComment = async(req, res) => {
  comment.create(req.body)
    .then(async(comment) => {
      user.findByIdAndUpdate(req.body.user, { $push: { comments: comment._id }}, { new: true })
        .then(() => res.send({message: "Comment added", status: true}))
    })
    .catch(() => res.status(501).send({message: "Server error", status:false}))
}

exports.getComment = async(req, res) => {
  comment.find({})
    .then((data) => res.send({data}))
    .catch(() => res.status(501).send({message: "Server error", status:false}))
}