import express from "express";
import multer from "multer"
import path from "path";
import { fileURLToPath } from "url";
import { ensureAdmin,ensureAuthenticated } from "../middlewares/authenticate.js";
import{getAllProductPlants,addPlant, addPlantForm, deletePlant} from "../controllers/plantController.js";
const router=express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage=multer.diskStorage({
  destination:(req,file,cb)=>
  {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload=multer({storage:storage})
router.get("/products",getAllProductPlants);
router.post("/products",addPlant);
router.post("/plants",ensureAuthenticated,ensureAdmin,upload.single("image"),addPlantForm);
router.delete("/plants/:id",ensureAuthenticated,ensureAdmin,deletePlant);

export default router;