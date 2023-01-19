const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Please confirm registration ",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}" target="_blank">Click for confirm email</a>`,
  };
  await sendEmail(mail);
  await console.log(`Letter send to ${email}`);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
