import { isSomething } from "../../libs/helpers";
import { Post } from "../../models";

const profilePosts = async (req, res, next) => {
  try {
    let { userId } = req.params;
    if (!isSomething(userId)) {
      userId = req.user._id;
    }
  
    const posts = await Post.profileFeed(userId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export default profilePosts;
