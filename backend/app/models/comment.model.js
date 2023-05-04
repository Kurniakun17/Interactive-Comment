module.exports = mongoose => {
  const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  })

  return mongoose.model('Comment', commentSchema)
}