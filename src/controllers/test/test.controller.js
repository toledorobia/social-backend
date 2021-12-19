import multer from "multer";
import config from "../../config";
import { httpError } from "../../libs/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../libs/helpers";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/test");
  },
  filename: (req, file, cb) => {
    cb(null, makeFilename(file.originalname));
  },
});

export const imagesTestUpload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const mimes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

    if (mimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(httpError(400, "Invalid file type. Only images."), false);
    }
  },
});

export const check = async (req, res, next) => {
  res.json({ status: true, message: "Test controller works" });
};
