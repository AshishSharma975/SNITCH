import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct,getSellerProduct,getAllProduct,getProductById,createProductVariant,deleteProductVariant } from "../controllers/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";

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
  createProductValidator,
  createProduct              
);

router.get("/seller",authenticateSeller,getSellerProduct)

router.get("/",getAllProduct)

router.get("/details/:productId",getProductById)

router.post("/:productId/variant",authenticateSeller,upload.array("images", 7),createProductVariant)
router.delete("/:productId/variant/:variantId", authenticateSeller, deleteProductVariant)

export default router;