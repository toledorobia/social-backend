import { HttpException } from "../../libs/errors";
import { Post } from "../../models";
import _ from "lodash";

const likePost = async (req, res, next) => {
  console.log("params", req.params);
  try {
    const { id } = req.params;


    const post = await Post.findById(id);
    if (!post) {
      throw new HttpException(404, "Post not found");
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
    }

    const postUpdated = await Post.getById(post._id);
    res.json(postUpdated.cleanObject());
  } catch (error) {
    next(error);
  }
};

export default likePost;
