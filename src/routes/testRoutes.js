import { Router } from "express";
// import { validate, verifyToken } from "../libs/middlewares";
import * as testController from "../controllers/test";
// import * as postsSchema from "../schemas/posts";

const router = Router();

router.post(
  "/image",
  testController.uploadImageMulter.single("image"),
  testController.uploadImage
);

export default router;
