import { Post } from "../../models";

const feedPosts = async (req, res) => {
  const posts = await Post.feed();
  res.json(posts);
};

export default feedPosts;
