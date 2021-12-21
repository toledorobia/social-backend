import { Schema, model } from "mongoose";

export const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    hashMail: {
      type: String,
      required: false,
      trim: true,
    },
    hashPasswordRecovery: {
      type: String,
      required: false,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.cleanObject = function () {
  // eslint-disable-next-line no-unused-vars
  const { password, deleted, hashMail, hashPassword, _id: id, ...ouser } =
    this.toObject();

  return { id, ...ouser };
};

export default model("User", userSchema);
