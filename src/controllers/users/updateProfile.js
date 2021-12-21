import multer from "multer";
import { User } from "../../models";
import { HttpException } from "../../libs/errors";
import { processImage } from "../../libs/files";
import { isSomething } from "../../libs/helpers";

const storage = multer.memoryStorage();
export const uploadAvatarMulter = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const mimes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

    if (mimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new HttpException(400, "Invalid image"), false);
    }
  },
});

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new HttpException(401, "User not found");
    }
    
    const { name } = req.body;
    console.log(req.body);
    if (isSomething(name)) {
      user.name = name;
    }
    
    const file = req.file;
    if (isSomething(file)) {
      const url = await processImage(file, "./public/images");
      user.avatar = url;
    }

    user.save();
    
    res.json(user.cleanObject());
  } catch (error) {
    next(error);
  }
};

export default updateProfile;
