const { addContact } = require("../../models/contacts");

const add = async (req, res) => {
  const body = req.body;
  const newContact = await addContact(body);
  res.status(201).json({ newContact });
};

module.exports = add;
