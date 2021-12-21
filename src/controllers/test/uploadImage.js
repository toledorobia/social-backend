import multer from "multer";
import { HttpException } from "../../libs/errors";
import { processImage } from "../../libs/files";

const storage = multer.memoryStorage();
export const uploadImageMulter = multer({
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

const uploadImage = async (req, res) => {
  const url = await processImage(req.file, "./public/images");

  res.json({
    message: url,
  });
};

export default uploadImage;
