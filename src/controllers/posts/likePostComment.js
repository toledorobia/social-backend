import { HttpException } from "../../libs/errors";
import { Comment, Post } from "../../models";
import _ from "lodash";

const likePostComment = async (req, res, next) => {
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

    const exists = _.some(comment.likes, { user: req.user._id });
    if (!exists) {
      await Comment.updateOne(
        {
          _id: comment._id,
        },
        {
          $push: {
            likes: {
              user: req.user._id,
            },
          },
        }
      );
    } else {
      await Comment.updateOne(
        {
          _id: comment._id,
        },
        {
          $pull: {
            likes: {
              user: req.user._id,
            },
          },
        }
      );
    }

    const updatedComment = await Comment.getById(commentId);
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export default likePostComment;
