const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner },
    {},
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  res.status(200).json({ contacts });
};

module.exports = getAll;
