import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  authToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  versionKey: false,
  timestamps: true,
});

tokenSchema.methods.isExpired = function isExpired() {
  return this.expired;
};

tokenSchema.methods.setExpired = async function setExpired() {
  // this.expired = true;
  await this.save();
};

export default model("token", tokenSchema);