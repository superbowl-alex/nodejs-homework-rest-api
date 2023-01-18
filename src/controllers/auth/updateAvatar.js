const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { file } = req;
  const { path: tempUpload, filename } = file;
  const img = await jimp.read(file.path);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(file.path);
  const newFileName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, newFileName);

  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    return next(error);
  }
};

module.exports = updateAvatar;
