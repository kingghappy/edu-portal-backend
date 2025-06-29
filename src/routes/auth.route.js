import express from 'express'
import AuthService from './../services/auth.service.js';
import AuthController from './../controllers/auth.controller.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = express.Router()

const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/login', authController.login)

router.use(errorHandler);


export default router
