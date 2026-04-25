import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AED', 'CAD', 'AUD'],
        default: 'INR'
    }
}, { 
    _id: false,
    versionKey: false 
});

export default PriceSchema;