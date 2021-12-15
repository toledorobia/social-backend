import { Schema, model } from "mongoose";
import { likeSchema } from "./like";
import { profileSchema } from "./user";

const postSchema = new Schema(
  {
    user: profileSchema,
    content: {
      type: String,
      required: true,
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

export default model("Post", postSchema);
