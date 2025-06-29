import express from "express";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import models from "../config/types/models.js";
import UserController from "../controllers/user.controller.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = express.Router();

// Khởi tạo dependencies
const authService = new AuthService();  
const userService = new UserService(authService, models);
const userController = new UserController(userService);

// Routes
router.get("/profile", userController.getProfile);
router.post("/change-password", userController.changePass);

// Error handling middleware
router.use(errorHandler);

export default router;