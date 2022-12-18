const { updateContact } = require("../../models/contacts");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const updatedContact = await updateContact(id, body);
    if (!updatedContact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({ updatedContact });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
