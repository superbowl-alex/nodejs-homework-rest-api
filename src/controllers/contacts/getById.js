const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({ contact });
};

module.exports = getById;
