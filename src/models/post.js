import { Schema, model } from "mongoose";
import { likeSchema } from "./like";
import { profileSchema } from "./user";

const postSchema = new Schema(
  {
    user: profileSchema,
    content: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likes: [likeSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

postSchema.methods.cleanObject = function (others = {}) {
  // eslint-disable-next-line no-unused-vars
  const { deleted, _id: id, ...post } = this.toObject();
  return { id, comments: [], ...post, ...others };
};

postSchema.statics.getById = async function (id) {
  const post = await this.findOne({ _id: id }).populate("likes.user", "_id name avatar");
  return post.cleanObject({ comments: [], commentsLoaded: false });
};


// eslint-disable-next-line no-unused-vars
postSchema.statics.feed = async function (page, limit) {
  const posts = await this.find({ deleted: false })
    .populate("likes.user", "_id name avatar")
    .sort({ createdAt: -1 });

  return posts.map((post) => post.cleanObject({ comments: [], commentsLoaded: false }));
}

export default model("Post", postSchema);
