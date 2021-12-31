import { HttpException } from "../../libs/errors";
import { Post, Comment } from "../../models";

const createPostComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
    }

    const comment = new Comment({
      postId: post._id,
      content,
      user: {
        id: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
      },
    });

    await comment.save();
    res.json(comment.cleanObject());
  } catch (error) {
    next(error);
  }
  
};

export default createPostComment;
