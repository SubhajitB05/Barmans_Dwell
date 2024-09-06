import express from "express";
const router = express.Router();
import {handleUserRegistration, handleUserLogin, handleUserDashboard} from '../controllers/userAuth.controller.js';
import {validateUser} from '../middlewares/validateUser.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { handleUlpoadAvatar } from "../controllers/user.controller.js";
import {handleUserProfile} from '../controllers/user.controller.js';

// Uaser Authentication Routes
router.post('/auth/register', handleUserRegistration);
router.post('/auth/login', handleUserLogin);
router.get('/:id/dashboard', validateUser, handleUserDashboard);
router.get('/:id/profile', validateUser, handleUserProfile);

// User dashboard Routes
router.post('/profile/avatar', upload.single('avatar'), handleUlpoadAvatar)

export default router;