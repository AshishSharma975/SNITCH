import mongoose from "mongoose";
import PriceSchema from "./price.schema.js";


const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },
   price:PriceSchema,
   images: [
  {
    url: {
      type: String,
      required: true
    }
  }
  
],
variants:[{
    images:[{
        url:{
            type:String,
            required:true
        }
    }],
    size:{
        type:String,
    },
    stock:{
        type:Number,
        default:0
    },
    color:{
        type:String,
    },
       attributes:[{
        type:Map,
        of:String,
    }],
    price:PriceSchema
    }
],
},{timestamps:true})

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel;