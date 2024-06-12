import express from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/authController.js";


const router = express.Router();


router.post('/login', loginUser);
router.post('/register', registerUser);
router.post("/refresh-token", refreshToken);
export default router