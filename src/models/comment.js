import { Schema, model } from "mongoose";
import { profileSchema } from "./user";
import { likeSchema } from "./like";

export const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: profileSchema,
    content: {
      type: String,
      required: true,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    likes: [likeSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

commentSchema.methods.cleanObject = function () {
  // eslint-disable-next-line no-unused-vars
  const { deleted, _id: id, ...comment } = this.toObject();
  return { id, ...comment };
};

commentSchema.statics.getByPost = async function (postId) {
  const comments = await this.find({ postId, deleted: false })
    .populate("likes.user", "_id name avatar")
    .sort({ createdAt: -1 });
  return comments.map((comment) => comment.cleanObject());
};

commentSchema.statics.getById = async function (id) {
  const comment = await this.findById(id).populate("likes.user", "_id name avatar");
  return comment.cleanObject();
};

export default model("Comment", commentSchema);
