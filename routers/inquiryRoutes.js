import express from "express";
import { postInquiry } from "../controllers/inquiryController.js";

const router=express.Router();
router.post("/inquiries",postInquiry);
export default router;