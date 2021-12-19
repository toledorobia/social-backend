import multer from "multer";
import config from "../../config";
import { httpError } from "../../libs/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../libs/helpers";
import { Post, Comment } from "../../models";

const getPostComments = async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return next(httpError(404, "Post not found"));
  }

  const comments = await Comment.find({ postId }).populate(
    "likes.user",
    "_id name avatar"
  );

  res.json({ comments });
};

export default getPostComments;
