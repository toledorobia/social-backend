import { HttpException } from "../../libs/errors";
import { Comment, Post } from "../../models";

const deletePostComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new HttpException(404, "Comment not found");
    }

    comment.deleted = true;
    await comment.save();

    const updatedComment = await Comment.getById(commentId);
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export default deletePostComment;
