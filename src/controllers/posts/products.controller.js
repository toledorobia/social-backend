import multer from "multer";
import config from "../../config";
import { httpError } from "../../utils/errors";
import { makeFilename, valueOrDefault, isSomething } from "../../utils/helpers";
import Product from "../../models/product.model";
import productModel from "../../models/product.model";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images/products");
//   },
//   filename: (req, file, cb) => {
//     cb(null, makeFilename(file.originalname));
//   },
// });

// export const imagesProductsUpload = multer({
//   storage,
//   limits: { fileSize: 5000000 },
//   fileFilter: (req, file, cb) => {
//     const mimes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

//     if (mimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(httpError(400, "Invalid file type. Only images."), false);
//     }
//   },
// });

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     return next(httpError(500, "Can't get products."));
//   }
// };

export const create = async (req, res, next) => {
  console.log(req.files);

  const { name, description, price, category, quantity } = req.body;
  const repeat = await Product.findRepeated(name);

  if (repeat) {
    return next(httpError(400, "Product already exists."));
  }

  const product = new Product({
    name,
    description,
    price,
    quantity,
    images: req.files ? req.files.map((file) => ({ path: file.filename })) : [],
  });

  await product.save();

  res.json(product.toObject());
};

export const edit = async (req, res, next) => {
  console.log(req.files);

  const { id, name, description, price, category, quantity } = req.body;
  const product = await Product.findById(id);

  if (!product) {
    return next(httpError(404, "Product not found"));
  }

  if (isSomething(name)) {
    const repeat = await Product.findRepeated(name, id);
    if (repeat) {
      return next(httpError(400, "Product with the same name already exists."));
    }
  }

  product.name = valueOrDefault(name, product.name);
  product.description = valueOrDefault(description, product.description);
  product.price = valueOrDefault(price, product.price);
  product.quantity = valueOrDefault(quantity, product.quantity);

  if (req.files) {
    product.images = req.files.map((file) => ({ path: file.filename }));
  }

  await product.save();

  res.json(product.toObject());
};
