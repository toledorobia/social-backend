import multer from "multer";
import { User } from "../../models";
import { httpError } from "../../utils/errors";
import { createFileName, uploadImage } from "../../utils/helpers";
import mime from "mime-types";
import fs from "fs";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folder = "./public/images/avatars";
//     fs.mkdirSync(folder, { recursive: true });
//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     cb(null, createFileName(mime.extension(file.mimetype)));
//   },
// });

// export const avatarUpload = multer({
//   storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: (req, file, cb) => {
//     const mimes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

//     if (mimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(httpError(400, "Invalid file type. Only images."), false);
//     }
//   },
// });

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(httpError(401, "User not found"));
    }

    const { name, avatar } = req.body;

    user.name = name;
    if (avatar) {
      user.avatar = avatar;
    }

    user.save();

    const { password, deleted, ...ouser } = user.toObject();
    res.json(ouser);
  } catch (error) {
    console.log(error);
    return next(httpError(500, error));
  }
};

export default updateProfile;
