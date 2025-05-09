import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routers/userRoutes.js";
import plantRoutes from "./routers/plantRoutes.js";
import inquiryRoutes from "./routers/inquiryRoutes.js";
import articleRoutes from "./routers/articleRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoURI = "mongodb://127.0.0.1:27017/plantmarket";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error in connecting:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Plant Market API!");
});

app.get("/products", plantRoutes);

app.post("/products", plantRoutes);

app.post("/plants", plantRoutes);

app.delete("/plants/:id", plantRoutes);

app.post("/inquiries", inquiryRoutes);
app.get("/articles", articleRoutes);
app.use("/user", userRoutes);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});
