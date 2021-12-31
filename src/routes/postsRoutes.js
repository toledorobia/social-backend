import { Router } from "express";
import { validate, verifyToken } from "../libs/middlewares";
import * as postsController from "../controllers/posts";
import * as postsSchema from "../schemas/posts";

const router = Router();

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

router.post(
  "/:id/comments",
  verifyToken(),
  validate(postsSchema.createPostCommentSchema),
  postsController.createPostComment
);

router.get(
  "/:id/comments",
  verifyToken(),
  validate(postsSchema.postCommentsSchema),
  postsController.postComments
);

router.put(
  "/:id/comments/:commentId/like",
  verifyToken(),
  validate(postsSchema.likePostCommentSchema),
  postsController.likePostComment
);

router.delete(
  "/:id/comments/:commentId",
  verifyToken(),
  validate(postsSchema.deletePostCommentSchema),
  postsController.deletePostComment
);

// router.put(
//   "/",
//   verifyToken(["admin"]),
//   // postsController.imagespostsUpload.array("images"),
//   validate(postsSchema.updateSchema),
//   postsController.edit
// );

export default router;
