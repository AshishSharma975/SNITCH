import express from 'express';
import { authenticateBuyer,authenticate } from '../middlewares/auth.middleware.js';
import { addToCart,getCart,updateQuantity,removeFromCart } from '../controllers/cart.controller.js';
import { cartValidator } from '../validator/cart.validator.js';

const router = express.Router();


router.post("/add/:productId/:variantId",authenticateBuyer,cartValidator,addToCart)
router.get("/",authenticateBuyer,getCart)
router.put("/update/:productId/:variantId",authenticateBuyer,updateQuantity)
router.delete("/remove/:productId/:variantId",authenticateBuyer,removeFromCart)

export default router;