import multer from "multer";
import config from "../../config";
import { httpError } from "../../utils/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../utils/helpers";
import { Post } from "../../models";

const profilePosts = async (req, res, next) => {
  let { userId } = req.params;
  if (!isSomething(userId)) {
    userId = req.user._id;
  }

  // console.log("userId", userId);

  const posts = await Post.find({ "user.userId": userId })
    .populate("likes.user", "_id name avatar")
    .sort({ createdAt: -1 });

  res.json({ posts });
};

export default profilePosts;
