import CartModel from "../models/cart.model.js";
import { createRazorpayOrder as createRazorpayOrderService } from "../services/payment.service.js";
import { config } from "../config/config.js";
import paymentModel from "../models/payment.model.js";
import crypto from "node:crypto";

export const createRazorpayOrder = async (req, res, next) => {
    try {
        const user = req.user;

        const cart = await CartModel.findOne({ user: user._id }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        if (!cart.items || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + (item.price.amount * item.quantity);
        }, 0);

        const currency = cart.items[0]?.price?.currency || "INR";

        const razorpayOrder = await createRazorpayOrderService(totalAmount, currency);
        await paymentModel.create({
            user: user._id,
            status: "PENDING",
            price: {
                amount: totalAmount,
                currency: currency
            },
            razorpayOrderId: razorpayOrder.id,
            razorpayPaymentId: "pending", 
            razorpaySignature: "pending", 
            orderItems: cart.items.map(item => ({
                title: item.productId.title,
                productId: item.productId._id,
                variantId: item.variantId,
                images: item.productId.images,
                description: item.productId.description,
                quantity: item.quantity,
                price: item.price
            }))
        });

        res.status(200).json({ razorpayOrder, key: config.RAZORPAY_KEY_ID });
    } catch (err) {
        console.error("Razorpay order creation failed:", err);
        res.status(500).json({ message: "Failed to create payment order", error: err.message });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const user = req.user;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (!isSignatureValid) {

            await paymentModel.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "FAILED" }
            );
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const payment = await paymentModel.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { 
                status: "SUCCESSFUL",
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature
            },
            { new: true }
        );

        const cart = await CartModel.findOne({ user: user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(200).json({ 
            message: "Payment verified successfully", 
            payment 
        });

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ message: "Internal server error during verification" });
    }
}

export const getOrders = async (req, res) => {
    try {
        const user = req.user;

        const orders = await paymentModel.find({ 
            user: user._id,
            status: { $in: ["SUCCESSFUL", "PENDING"] }
        }).sort({ createdAt: -1 });

        res.status(200).json({ 
            message: "Orders fetched successfully", 
            orders 
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        res.status(500).json({ message: "Internal server error while fetching orders" });
    }
}

