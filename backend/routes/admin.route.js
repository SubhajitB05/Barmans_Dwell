import express from "express";
import 
{ 
    handleAdminDashboard, 
    handleAdminProfile, 
    handleGetAllUsers,
    handleGetUserById,
    handleGetUserRent,
    handleGetUserPayment,
    handleGetUserELectricityBill,
    handleAddUserRent
} 
from '../controllers/admin.controller.js';
import {validateUser} from "../middlewares/validateUser.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

// Admin Dashboard Route
router.get('/dashboard', validateUser, isAdmin, handleAdminDashboard);
router.get('/profile', validateUser, isAdmin, handleAdminProfile);
router.get('/users', validateUser, isAdmin, handleGetAllUsers);
router.get('/users/:id', validateUser, isAdmin, handleGetUserById);
router.get('/users/:id/rent', validateUser, isAdmin, handleGetUserRent);
router.get('/users/:id/payment', validateUser, isAdmin, handleGetUserPayment);
router.get('/users/:id/electricity-bill', validateUser, isAdmin, handleGetUserELectricityBill);

router.post('/users/:id/rent', validateUser, isAdmin, handleAddUserRent);

export default router;
