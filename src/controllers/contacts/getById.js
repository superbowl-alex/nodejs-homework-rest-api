const { getContactById } = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
