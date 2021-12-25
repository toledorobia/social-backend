import { HttpException } from "../../libs/errors";
import { Post } from "../../models";

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
    }

    post.deleted = true;
    await post.save();

    res.json(post.cleanObject());
  } catch (error) {
    next(error);
  }
  

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
