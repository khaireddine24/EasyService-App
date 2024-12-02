import express from 'express';
import prestataireController from '../controllers/prestataireController.js';

const router = express.Router();

// Define your routes
router.route("/update-service").post(prestataireController.updateServices);

export default router;
