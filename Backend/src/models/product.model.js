import mongoose from "mongoose";



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
   price:{
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        enum:['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AED', 'CAD', 'AUD'],
        default:'INR'
    }
   },
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
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            required:true,
            enum:['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AED', 'CAD', 'AUD'],
            default:'INR'
        }
    }
    }
],
},{timestamps:true})

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel;