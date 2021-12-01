import { Schema, model } from 'mongoose';

const imagesSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
}, {
  _id: false,
});

const categorySchema = new Schema({
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
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
  }
}, {
  _id: false,
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  categories: [categorySchema],
  images: [imagesSchema],
}, {
  versionKey: false,
  timestamps: true,
});

productSchema.statics.findRepeated = function (name, id = null) {
  const _name = name.toLowerCase();
  let query = { name: new RegExp(`^${_name}$`, 'i') };

  if (id) {
    query._id = { $ne: id };
  }

  return this.findOne(query);
};

export default model("Product", productSchema);