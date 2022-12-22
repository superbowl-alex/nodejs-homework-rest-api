const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await Contact.findByIdAndRemove(id);
  if (!deletedContact) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({
    message: `Contact with id=${id} deleted`,
  });
};

module.exports = deleteById;
