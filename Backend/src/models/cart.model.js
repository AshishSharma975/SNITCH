import mongoose from "mongoose";
import PriceSchema from "./price.schema.js";

const CartSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },
   items:[
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        variantId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product.variants',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
        price:PriceSchema,   
    }
   ],
   totalPrice: PriceSchema,
   totalItems:{
    type:Number,
    required:true
   }
},{
    timestamps:true
});

const CartModel = mongoose.model('cart', CartSchema);
export default CartModel;