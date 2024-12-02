import express from 'express';
import authController from '../controllers/authController.js';  // Add the .js extension

const router = express.Router();

// Define the routes
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);
router.route("/verify-email").get(authController.verifyEmail);
router.route("/reset").post(authController.resetPassword);
router.route("/sendResetEmail").post(authController.sendResetEmail);

export default router;  // Use export default to export the router
