import { Post } from "../../models";

const feedPosts = async (req, res) => {
  const posts = await Post.find({ deleted: false })
    .populate("likes.user", "_id name avatar")
    .sort({ createdAt: -1 });

  res.json(posts.map((post) => post.cleanObject()));
};

export default feedPosts;
