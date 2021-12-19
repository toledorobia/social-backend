import { httpError } from "../../libs/errors";
import { Post, Comment } from "../../models";

const createComment = async (req, res, next) => {
  const { postId, content } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return next(httpError(404, "Post not found"));
  }

  const comment = new Comment({
    postId: post._id,
    content,
    user: {
      userId: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
    },
  });

  await comment.save();
  // eslint-disable-next-line no-unused-vars
  const { deleted, ..._comment } = comment.toObject();
  res.json(_comment);
};

export default createComment;
