import { Schema, model } from 'mongoose';
import { roleSchema } from './role.model';
import { addressSchema } from './address.model';

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: false, 
    trim: true 
  },
  password: { 
    type: String, 
    required: false, 
  },
  deleted: { 
    type: Boolean, 
    default: false, 
  },
  roles: [roleSchema],
  addresses: [addressSchema],
}, { 
  versionKey: false,
  timestamps: true,
});

userSchema.methods.hasRoles = function (roles) {
  return this.roles.some(role => roles.includes(role.code));
};

userSchema.statics.findWithRoles = function (id) {
  return this.findOne({ _id: id }).populate("roles").exec();
}

export default model("User", userSchema);