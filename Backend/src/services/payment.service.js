import Razorpay from "razorpay"
import crypto from "node:crypto"
import { config } from "../config/config.js"

export const razorpayInstance = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET,
})

export const createRazorpayOrder = async (orderAmount, currency = "INR") => {
    const options = {
        amount: orderAmount * 100,
        currency,
        receipt: crypto.randomUUID(),
    }

    const order = await razorpayInstance.orders.create(options)
    return order
}
