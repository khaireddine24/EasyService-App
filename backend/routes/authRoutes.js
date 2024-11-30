import express from 'express';
import authController from '../controllers/authController.js';  // Add the .js extension

const router = express.Router();

// Define the routes
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

export default router;  // Use export default to export the router
