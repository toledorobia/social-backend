import { Schema, model } from 'mongoose';

export const citySchema = new Schema({
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
}, { 
  versionKey: false,
});

export default model("City", citySchema);