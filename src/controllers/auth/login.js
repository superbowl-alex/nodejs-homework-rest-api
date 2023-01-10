const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const createError = require("http-errors");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  console.log(SECRET_KEY);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
