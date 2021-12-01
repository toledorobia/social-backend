import { Schema, model } from 'mongoose';
import { citySchema } from './city.model';

export const stateSchema = new Schema({
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
  cities: [citySchema],
}, { 
  versionKey: false,
});

export default model("State", stateSchema);