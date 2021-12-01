import { Router } from 'express';
import { validate, verifyCookie, verifyToken } from '../utils/middlewares';
import * as authSchema from '../controllers/auth/auth.schema';
// import * as authController from '../controllers/auth/auth.cookie.controller';
import * as authController from '../controllers/auth/auth.token.controller';

const router = Router();

router.post("/signup", validate(authSchema.signUpSchema), authController.signUp);
router.post("/signin", validate(authSchema.signInSchema), authController.signIn);
router.post("/refresh", validate(authSchema.refreshSchema), authController.refresh);
// router.post("/signout", authController.signOut);
router.get("/test", verifyToken(), authController.test);

export default router;