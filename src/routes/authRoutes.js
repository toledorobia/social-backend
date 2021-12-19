import { Router } from "express";
import { validate, verifyToken } from "../libs/middlewares";
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
router.post("/signout", authController.signOut);
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
router.get(
  "/email/verify/:id/:hash",
  validate(authSchema.verifyEmailSchema),
  authController.verifyEmail
);
router.post(
  "/reset/send",
  validate(authSchema.sendPasswordResetEmailSchema),
  authController.sendPasswordResetEmail
);
router.get(
  "/reset/verify/:id/:hash",
  validate(authSchema.verifyPasswordResetHashSchema),
  authController.verifyPasswordResetHash
);
router.post(
  "/reset",
  validate(authSchema.resetPasswordSchema),
  authController.resetPassword
);

router.get("/check", verifyToken(), authController.check);

export default router;
