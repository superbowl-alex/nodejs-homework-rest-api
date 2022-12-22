const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const body = req.body;
  const newContact = await Contact.create(body);
  res.status(201).json({ newContact });
};

module.exports = add;
