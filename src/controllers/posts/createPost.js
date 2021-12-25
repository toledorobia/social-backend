import multer from "multer";
import { HttpException } from "../../libs/errors";
import { isSomething } from "../../libs/helpers"; 
import { processImage } from "../../libs/files"; 
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
  try {
    console.log(req.files);

    const post = new Post({
      user: {
        userId: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
      },
    });

    const { content } = req.body;
    if (isSomething(content)) {
      post.content = content;
    }

    const file = req.file;
    if (isSomething(file)) {
      const url = await processImage(file, "./public/images");
      post.image = url;
    }

    await post.save();

    res.json(post.cleanObject());
  } catch (error) {
    next(error);
  }
};

export default createPost;
