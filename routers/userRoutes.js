import express from 'express';;
import { handleUserLogin,handleUserSignUp } from "../controllers/userController.js";

const router=express.Router();
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);

export default router;