import multer from "multer";
import config from "../../config";
import { httpError } from "../../libs/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../libs/helpers";
import { Post } from "../../models";

const feedPosts = async (req, res, next) => {
  const posts = await Post.find({})
    .populate("likes.user", "_id name avatar")
    .sort({ createdAt: -1 });

  res.json({ posts });
};

export default feedPosts;
