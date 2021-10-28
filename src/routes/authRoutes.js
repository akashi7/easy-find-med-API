import { Router } from "express";
import authController from "../controllers/auth";
import helper from "../middleware/helper";

const authRoutes = Router();


authRoutes.post('/register', helper.registerVal, authController.registerPharmacy);
authRoutes.post('/login', helper.loginVal, authController.pharmacyLogin);



export default authRoutes;