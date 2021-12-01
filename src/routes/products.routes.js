import { Router } from 'express';
import { validate, verifyCookie, verifyToken } from '../utils/middlewares';
import * as productsController from '../controllers/products/products.controller';
import * as productsSchema from '../controllers/products/products.schema';

const router = Router();

router.post(
  "/", 
  verifyToken(["admin"]),
  productsController.imagesProductsUpload.array("images"),
  validate(productsSchema.createSchema),
  productsController.create
);

router.put(
  "/", 
  verifyToken(["admin"]),
  productsController.imagesProductsUpload.array("images"),
  validate(productsSchema.updateSchema),
  productsController.edit
);

export default router;