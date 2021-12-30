import { HttpException } from "../../libs/errors";
import { Comment } from "../../models";

const deletePostComment = async (req, res, next) => {
  


  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return next(httpError(404, "Comment not found"));
  }

  comment.deleted = true;
  await comment.save();

  res.json({
    status: true,
    message: "Comment deleted successfully",
  });

  // Comment.deleteOne({ _id: id }, (err) => {
  //   if (err) {
  //     return next(httpError(500, "Internal server error"));
  //   } else {
  //     res.json({
  //       status: true,
  //       message: "Comment deleted successfully",
  //     });
  //   }
  // });
};

export default deletePostComment;
