const userModel = require("../models/index").user;

exports.register = async (req, res) => {
  const { username } = req.body;
  const existUsername = await userModel.findOne({ username });

  if (!existUsername) {
    const newUser = await userModel.create(req.body);
    return res.send({
      message: "Account telah berhasil dibuat",
      data: newUser,
      status: true,
    });
  }
  res
    .status(401)
    .send({ message: "username or email has been used", status: false });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.find({ username: username });
    if (!user) {
      return res.status(404).send({
        message:
          "Login failed. Please double check your account and make sure that the username and password you entered are correct.",
        status: false,
      });
    }
    if (user[0].password === password) {
      return res.send({ data: user, status: true });
    }
    return res.send({
      message:
        "Login failed. Please double check your account and make sure that the username and password you entered are correct.",
    });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  userModel
    .find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(501).send({ message: err }));
};
