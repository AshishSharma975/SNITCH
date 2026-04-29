import mongoose from "mongoose";
import PriceSchema from "./price.schema.js";

const paymentSchema = new mongoose.Schema({
    status:{
        type: String,
        enum:["PENDING","SUCCESSFUL","FAILED"],
        default:"PENDING"
    },
    price:{
        type: PriceSchema,
        required:true
    },
    razorpayOrderId:{
        type: String,
        required:true
    },
    razorpayPaymentId:{
        type: String,
        required:true
    },
    razorpaySignature:{
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[{
       title:String,
       productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
       },
       variantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Variant"
       },
       images:[
        {
            url:String,
            size:String,
            color:String,
        }
       ],
       description:String,
       quantity:Number,
       price: PriceSchema
    }]
   
    
    
})

const paymentModel = mongoose.model("payment", paymentSchema)

export default paymentModel;