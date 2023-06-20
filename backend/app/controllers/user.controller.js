const userModel = require("../models/index").user;

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const existUsername = await userModel.findOne({ username });
    if (existUsername) {
      return res.send({ data: true });
    }
    return res.send({ data: false });
  } catch (error) {
    res.status(501).send({ message: error.message });
  }
};

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
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: "Account not found. Please register an account first.",
        status: false,
      });
    }

    if (user.password === password) {
      return res.send({
        data: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
        status: true,
      });
    }

    return res.status(401).send({
      message: "Incorrect password. Please try again",
      status: false,
    });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  userModel
    .find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(501).send({ message: err.message }));
};

exports.dropUserCollection = async (req, res) => {
  userModel.collection.drop().then(() => {
    res.send({ message: "sucess" });
  });
};
