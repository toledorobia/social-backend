import { Schema, model } from 'mongoose';

export const categorySchema = new Schema({
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

export default model("Category", categorySchema);