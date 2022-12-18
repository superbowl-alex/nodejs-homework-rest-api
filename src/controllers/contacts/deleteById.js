const { removeContact } = require("../../models/contacts");
const createError = require("http-errors");

const deleteById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({
      message: `Contact with id=${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
