import multer from "multer";
import config from "../../config";
import { httpError } from "../../utils/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../utils/helpers";
import { Post } from "../../models";

const createPost = async (req, res, next) => {
  console.log(req.files);

  const { content, image } = req.body;

  const post = new Post({
    user: {
      userId: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
    },
    content,
    image,
  });

  await post.save();

  const { deleted, ..._post } = post.toObject();
  res.json({ _post });
};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images/products");
//   },
//   filename: (req, file, cb) => {
//     cb(null, makeFilename(file.originalname));
//   },
// });

// export const imagesProductsUpload = multer({
//   storage,
//   limits: { fileSize: 5000000 },
//   fileFilter: (req, file, cb) => {
//     const mimes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

//     if (mimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(httpError(400, "Invalid file type. Only images."), false);
//     }
//   },
// });

export default createPost;
