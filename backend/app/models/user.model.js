module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      png: {
        type: String,
        default: "./images/avatars/image-juliusomo.png",
      },
      webp: {
        type: String,
        default: "./images/avatars/image-juliusomo.webp",
      },
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  });

  return mongoose.model("User", userSchema);
};
