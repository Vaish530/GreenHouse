import express from "express"
import {getArticles} from "../controllers/articleController.js";

const router =express.Router();
router.get("/articles",getArticles);

export default router;