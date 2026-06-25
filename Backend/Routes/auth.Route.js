import express from "express";
import authController from "../Controllers/auth.Controller.js";
import isAuth from "../Middleware/auth.middleware.js";
const authRouter = express.Router();


/**
 * @route POST /api/user/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController);

/**
 * @route POST /api/user/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

/**
 * @route GET api/user/auth/account
 * @desc Get current user account info
 * @access Private
 */
authRouter.get("/account", isAuth, authController.currentUserController)

/**
 * @route GET /api/user/logout
 * @desc Logut user and remove token
 * @access Public
 */
authRouter.get("/logout", authController.LogoutController);

export default authRouter;