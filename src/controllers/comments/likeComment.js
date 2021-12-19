import config from "../../config";
import { httpError } from "../../libs/errors";
import { Comment } from "../../models";
import _ from "lodash";

const likeComment = async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return next(httpError(404, "Comment not found"));
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

    res.json({ status: true, message: "Comment liked successfully" });
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

    res.json({ status: true, message: "Comment unliked successfully" });
  }
};

export default likeComment;
