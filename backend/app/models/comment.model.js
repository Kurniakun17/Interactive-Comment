module.exports = (mongoose) => {
  const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  });

  return mongoose.model("Comment", commentSchema);
};
