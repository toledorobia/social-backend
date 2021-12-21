import { Router } from "express";
import { validate, verifyToken } from "../libs/middlewares";
import * as usersSchema from "../schemas/users";
import * as usersController from "../controllers/users";

const router = Router();

router.get(
  "/:id",
  verifyToken(),
  validate(usersSchema.profileSchema),
  usersController.profile
);

router.put(
  "/:id",
  verifyToken(),
  usersController.uploadAvatarMulter.single("avatar"),
  validate(usersSchema.updateProfileSchema),
  usersController.updateProfile
);


export default router;
