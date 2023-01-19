const { User } = require("../../models/user");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }

  if (user) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Please confirm registration ",
    html: `<a href="http://localhost:3000/users/verify/${user.verificationToken}" target="_blank">Click for confirm email</a>`,
  };
  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
