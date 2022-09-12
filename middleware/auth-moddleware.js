const protect = (req, res, next) => {
  const { user } = req.session;

  console.log(req)

  if (!user) return res.status(400).json({ message: "unauthorized" });

  req.user = user;

  next();
};

module.exports = protect;
