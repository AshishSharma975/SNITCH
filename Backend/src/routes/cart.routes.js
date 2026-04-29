import express from 'express';
import { authenticateBuyer,authenticate } from '../middlewares/auth.middleware.js';
import { addToCart,getCart,updateQuantity,removeFromCart,incrementQuantity } from '../controllers/cart.controller.js';
import { cartValidator,updateQuantityValidator } from '../validator/cart.validator.js';
import { createRazorpayOrder } from '../controllers/payment.controller.js';

const router = express.Router();


router.post("/add/:productId/:variantId",authenticateBuyer,cartValidator,addToCart)
router.get("/",authenticateBuyer,getCart)
router.put("/update/:productId/:variantId",authenticateBuyer,updateQuantity)
router.delete("/remove/:productId/:variantId",authenticateBuyer,removeFromCart)
router.patch("/quantity/increment/:productId/:variantId",authenticateBuyer,incrementQuantity)
router.post("/payment/create/order",authenticateBuyer,createRazorpayOrder)
export default router;