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

export default model("Comment", commentSchema);
