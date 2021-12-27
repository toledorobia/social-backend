import { Router } from "express";
import { validate, verifyToken } from "../libs/middlewares";
import * as postsController from "../controllers/posts";
import * as postsSchema from "../schemas/posts";

const router = Router();

// router.get("/", postsController.getposts);

router.get("/feed", verifyToken(), postsController.feedPosts);
router.get(
  "/profile/:userId?",
  verifyToken(),
  validate(postsSchema.profilePostsSchema),
  postsController.profilePosts
);

router.post(
  "/",
  verifyToken(),
  postsController.uploadImageMulter.single("image"),
  validate(postsSchema.createPostSchema),
  postsController.createPost
);

router.delete(
  "/:id",
  verifyToken(),
  validate(postsSchema.deletePostSchema),
  postsController.deletePost
);

router.put(
  "/:id/like",
  verifyToken(),
  validate(postsSchema.likePostSchema),
  postsController.likePost
);

// router.put(
//   "/",
//   verifyToken(["admin"]),
//   // postsController.imagespostsUpload.array("images"),
//   validate(postsSchema.updateSchema),
//   postsController.edit
// );

export default router;
