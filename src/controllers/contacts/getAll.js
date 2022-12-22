const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ contacts });
};

module.exports = getAll;
