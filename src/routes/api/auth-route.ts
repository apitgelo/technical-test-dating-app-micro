import express from "express";
import * as authController from "../../controllers/auth-controller";
import { validationBodyMiddleware } from "../../middlewares/validation-middleware";
import { AuthLoginValidator, AuthRegisterValidator } from "../../validators/auth-validator";

const router = express.Router();

router.post("/register", validationBodyMiddleware(AuthRegisterValidator), authController.registerUser);
router.post("/login", validationBodyMiddleware(AuthLoginValidator), authController.loginUser);

export default router;
