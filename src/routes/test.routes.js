import { Router } from "express";
import { validate, verifyCookie, verifyToken } from "../utils/middlewares";
import * as authSchema from "../controllers/auth/auth.schema";
// import * as authController from '../controllers/auth/auth.cookie.controller';
import * as testController from "../controllers/test/test.controller";

const router = Router();
router.get("/check", testController.check);

export default router;
