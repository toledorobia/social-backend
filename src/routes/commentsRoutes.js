import { Router } from "express";
import { validate, verifyCookie, verifyToken } from "../libs/middlewares";
import * as commentsController from "../controllers/comments";
import * as commentsSchema from "../schemas/comments";

const router = Router();

router.get(
  "/post/:postId",
  verifyToken(),
  validate(commentsSchema.getPostCommentsSchema),
  commentsController.getPostComments
);

router.post(
  "/",
  verifyToken(),
  validate(commentsSchema.createCommentSchema),
  commentsController.createComment
);

router.delete(
  "/:id",
  verifyToken(),
  validate(commentsSchema.deleteCommentSchema),
  commentsController.deleteComment
);

router.post(
  "/like/:id",
  verifyToken(),
  validate(commentsSchema.likeCommentSchema),
  commentsController.likeComment
);

export default router;
