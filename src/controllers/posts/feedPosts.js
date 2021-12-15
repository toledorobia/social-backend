import multer from "multer";
import config from "../../config";
import { httpError } from "../../utils/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../utils/helpers";
import { Post } from "../../models";

const feedPosts = async (req, res, next) => {
  const posts = await Post.find({}).populate("likes.user", "_id name avatar");

  res.json({ posts });
};

export default feedPosts;
