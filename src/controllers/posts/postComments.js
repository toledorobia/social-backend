import { HttpException } from "../../libs/errors";
import { Post, Comment } from "../../models";

const postComments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
    }

    const comments = await Comment.getByPost(id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
  
};

export default postComments;
