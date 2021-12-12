import { Router } from "express";
import { validate, verifyCookie, verifyToken } from "../utils/middlewares";
import * as postsController from "../controllers/posts";
import * as postsSchema from "../schemas/posts";

const router = Router();

// router.get("/", postsController.getposts);

router.post(
  "/",
  verifyToken(),
  // postsController.imagespostsUpload.array("images"),
  validate(postsSchema.createPostSchema),
  postsController.createPost
);

router.delete("/:id", verifyToken(), postsController.deletePost);
// router.put(
//   "/",
//   verifyToken(["admin"]),
//   // postsController.imagespostsUpload.array("images"),
//   validate(postsSchema.updateSchema),
//   postsController.edit
// );

export default router;