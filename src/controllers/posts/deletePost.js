import config from "../../config";
import { httpError } from "../../utils/errors";
import { Post } from "../../models";

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(httpError(404, "Post not found"));
  }

  // await Post.remove({ _id: id }, );
  res.json({
    status: true,
    message: "Post deleted successfully",
  });
};

export default deletePost;
