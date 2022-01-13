import { HttpException } from "../../libs/errors";
import { Post, Comment } from "../../models";

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.getById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
    }

    const comments = await Comment.getByPost(id);
    res.json({ ...post, comments, commentsLoaded: true });
  } catch (error) {
    next(error);
  }
};

export default getPost;
