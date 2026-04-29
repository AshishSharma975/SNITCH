import CartModel from "../models/cart.model.js";
import { createRazorpayOrder as createRazorpayOrderService } from "../services/payment.service.js";
import { config } from "../config/config.js";

export const createRazorpayOrder = async (req, res, next) => {
    try {
        const user = req.user;

        const cart = await CartModel.findOne({ user: user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        if (!cart.items || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total from items since totalPrice on the cart document
        // may not be kept in sync by all cart operations
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + (item.price.amount * item.quantity);
        }, 0);

        const currency = cart.items[0]?.price?.currency || "INR";

        if (totalAmount <= 0) {
            return res.status(400).json({ message: "Cart total is invalid" });
        }

        const razorpayOrder = await createRazorpayOrderService(totalAmount, currency);
        res.status(200).json({ razorpayOrder, key: config.RAZORPAY_KEY_ID });
    } catch (err) {
        console.error("Razorpay order creation failed:", err);
        res.status(500).json({ message: "Failed to create payment order", error: err.message });
    }
}
