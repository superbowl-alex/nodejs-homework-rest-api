const { listContacts } = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
};

module.exports = getAll;
