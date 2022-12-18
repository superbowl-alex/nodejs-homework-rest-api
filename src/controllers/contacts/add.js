const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await addContact(body);
    res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
