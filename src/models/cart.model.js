import { Schema, model } from 'mongoose';

const detailSchema = new Schema({
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
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
  }
}, {
  _id: false,
});

const cartSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  },
  amount: {
    type: String,
    required: true,
    trim: true
  },
  products: [
    new Schema({
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
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
      total: {
        type: Number,
        required: true,
        default: 0,
      }
    }, {
      _id: false,
    })
  ],
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

export default model("Cart", cartSchema);