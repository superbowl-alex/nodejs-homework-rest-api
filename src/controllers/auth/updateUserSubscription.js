const { User } = require("../../models/user");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(subscription);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription: subscription },
    {
      new: true,
    }
  );
  res.status(200).json({ updatedUser });
};

module.exports = updateUserSubscription;
