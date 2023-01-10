const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner }).populate("owner", "email");
  res.status(200).json({ contacts });
};

module.exports = getAll;
