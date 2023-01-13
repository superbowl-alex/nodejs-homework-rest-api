const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const isFavorite = req.params.favorite;
  // console.log(req.params);
  // console.log(isFavorite);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts =
    // isFavorite !== undefined
    //   ? await Contact.find(
    //       { owner, favorite: { isFavorite } },
    //       {},
    //       {
    //         skip,
    //         limit,
    //       }
    //     ).populate("owner", "email")
    await Contact.find(
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
