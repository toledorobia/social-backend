import { Schema, model } from 'mongoose';

export const roleSchema = new Schema({
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

export default model("Role", roleSchema);