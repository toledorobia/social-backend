import { Schema, model, mongo } from 'mongoose';

export const addressSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true 
  },
  streetLine1: { 
    type: String, 
    required: false, 
    trim: true 
  },
  streetLine2: { 
    type: String, 
    required: false, 
    trim: true 
  },
  state: new Schema({
    stateId: {
      type: Schema.Types.ObjectId,
      ref: 'State',
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    },
  }, { _id: false }),
  city: new Schema({
    cityId: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    },
  }, { _id: false }),
  zipCode: { 
    type: String, 
    required: true,
    trim: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  deleted: { 
    type: Boolean, 
    default: false, 
  }
}, { 
  versionKey: false,
  timestamps: true,
});

export default model("Address", addressSchema);