import express from "express";
const router = express.Router();
import {handleUserRegistration, handleUserLogin, handleUserLogout, handleUserDashboard} from '../controllers/userAuth.controller.js';
import {validateUser} from '../middlewares/validateUser.middleware.js';


// Uaser Authentication Routes
router.post('/auth/register', handleUserRegistration);
router.post('/auth/login', handleUserLogin);
router.get('/auth/logout', handleUserLogout);
router.get('/dashboard', validateUser, handleUserDashboard);

export default router;