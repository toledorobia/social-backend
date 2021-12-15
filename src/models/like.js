import { Schema } from "mongoose";

export const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);
