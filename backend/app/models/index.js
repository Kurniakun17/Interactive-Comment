const mongoose = require("mongoose");

module.exports = {
  url: "mongodb+srv://kurniakun17:kurnia020904@ics.yruythy.mongodb.net/?retryWrites=true&w=majority",
  mongoose: mongoose,
  comment: require("./comment.model")(mongoose),
  user: require("./user.model")(mongoose),
  // replyComment: require("./replycomment.model")(mongoose),
};
