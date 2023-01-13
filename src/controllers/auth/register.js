const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const createError = require("http-errors");

const register = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
