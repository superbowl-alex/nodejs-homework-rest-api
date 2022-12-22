const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, _, next) => {
  const id = req.params.contactId;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    throw createError(400, `${id} is not correct id format`);
  }
  next();
};

module.exports = isValidId;
