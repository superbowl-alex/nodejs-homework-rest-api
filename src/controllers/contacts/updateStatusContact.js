const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedContact) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({ updatedContact });
};

module.exports = updateStatusContact;
