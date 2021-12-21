import multer from "multer";
import config from "../../config";
import { httpError } from "../../libs/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../libs/helpers";
import { Post } from "../../models";

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

export default createPost;
