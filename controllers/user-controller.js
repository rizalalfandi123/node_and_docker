const User = require("../models/user-models ");

exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.session.user = user;

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: "not found user" });

    if (user.password !== req.body.password)
      return res.status(400).json({ message: "unauthorization" });

    req.session.user = user;

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
