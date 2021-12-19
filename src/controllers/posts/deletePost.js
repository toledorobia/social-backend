import config from "../../config";
import { httpError } from "../../libs/errors";
import { Post } from "../../models";

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(httpError(404, "Post not found"));
  }

  post.deleted = true;
  await post.save();

  res.json({
    status: true,
    message: "Post deleted successfully",
  });

  // Post.deleteOne({ _id: id }, (err) => {
  //   if (err) {
  //     return next(httpError(500, "Internal server error"));
  //   } else {
  //     res.json({
  //       status: true,
  //       message: "Post deleted successfully",
  //     });
  //   }
  // });
};

export default deletePost;
