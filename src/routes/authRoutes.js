import { Router } from "express";
import { validate, verifyCookie, verifyToken } from "../utils/middlewares";
import * as authSchema from "../schemas/auth";
import * as authController from "../controllers/auth";

const router = Router();

router.post(
  "/signup",
  validate(authSchema.signUpSchema),
  authController.signUp
);
router.post(
  "/signin",
  validate(authSchema.signInSchema),
  authController.signIn
);
router.post(
  "/refresh",
  // validate(authSchema.refreshSchema),
  authController.refresh
);

router.post(
  "/profile",
  verifyToken(),
  // authController.avatarUpload.single("avatar"),
  validate(authSchema.updateProfileSchema),
  authController.updateProfile
);
router.get("/check", verifyToken(), authController.check);
router.get("/test", verifyToken(), authController.test);

export default router;
