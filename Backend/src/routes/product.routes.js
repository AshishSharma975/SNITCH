import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const router = express.Router();

router.post(
  "/create",
  authenticateSeller,
  upload.array("images", 7), 
  createProduct              
);

export default router;