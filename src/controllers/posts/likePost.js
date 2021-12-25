import { HttpException } from "../../libs/errors";
import { Post } from "../../models";
import _ from "lodash";

const likePost = async (req, res, next) => {
  try {
    
  }


  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(httpError(404, "Post not found"));
  }

  const exists = _.some(post.likes, { user: req.user._id });
  if (!exists) {
    await Post.updateOne(
      {
        _id: post._id,
      },
      {
        $push: {
          likes: {
            user: req.user._id,
          },
        },
      }
    );

    res.json({ status: true, message: "Post liked successfully" });
  } else {
    await Post.updateOne(
      {
        _id: post._id,
      },
      {
        $pull: {
          likes: {
            user: req.user._id,
          },
        },
      }
    );

    res.json({ status: true, message: "Post unliked successfully" });
  }
};

export default likePost;
