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
  res.json(comment.cleanObject());
};

export default createComment;
