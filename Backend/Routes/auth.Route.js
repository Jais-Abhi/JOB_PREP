import express from "express";
import authController from "../Controllers/auth.Controller";

const authRouter = express.Router();


/**
 * @route POST /api/v1/user/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController);

/**
 * @route POST /api/v1/user/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

/**
 * @route GET /api/v1/user/logout
 * @desc Logut user and remove token
 * @access Public
 */
authRouter.get("/logout", authController.LogoutController);

export default authRouter;