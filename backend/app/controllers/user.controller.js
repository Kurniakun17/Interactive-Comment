const user = require("../models/index").user;

exports.register = async (req, res) => {
  const { username } = req.body;
  const existUsername = await user.findOne({ username });

  if (!existUsername) {
    user
      .create(req.body)
      .then(() =>
        res.send({ message: "Account telah berhasil dibuat", status: true })
      );
    return;
  }

  res
    .status(401)
    .send({ message: "username or email has been used", status: false });
};

exports.getUser = async (req, res) => {
  user
    .find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(501).send({ message: err }));
};
