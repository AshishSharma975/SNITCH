import CartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

export const  addToCart = async (req,res,next) => {
 
    const {productId, variantId} = req.params;
    const {quantity = 1} = req.body;

    const product = await productModel.findOne( {
        _id:productId,
        "variants._id":variantId
    } )
    if(!product){
        return res.status(404).json({
            message:"Product or variant not found"
        })
    }

     const stock = await stockOfVariant(productId,variantId)

    let cart = await CartModel.findOne({
        user:req.user._id
    }) || await CartModel.create({
        user:req.user._id,
        items:[],
        totalPrice:{amount:0, currency:'INR'},
        totalItems:0
    });

  
    const isProductAlreadyInCart = cart.items.find(
        item => item.productId.toString() === productId && item.variantId.toString() === variantId
    );

    if(isProductAlreadyInCart){
        const quantityinCart = cart.items.find(
            item => item.productId.toString() === productId && item.variantId.toString() === variantId
        ).quantity;
        if(quantityinCart >= stock){
            return res.status(400).json({
                message:"Product is out of stock"
            })
        }
        isProductAlreadyInCart.quantity += quantity;

    }
    else{
         cart.items.push({
            productId:productId,
            variantId:variantId,
            quantity:quantity,
            price:{
                amount:product.variants.find(v => v._id.toString() === variantId).price.amount,
                currency:product.variants.find(v => v._id.toString() === variantId).price.currency
            }
         });
    }

    await cart.save();
    res.status(200).json({
        message:"Product added to cart successfully",
        cart
    });
}

export const getCart = async (req,res,next) => {
    const user = req.user;
    const cart = await CartModel.findOne({
        user:user._id
    });
    if(!cart){
        return res.status(404).json({
            message:"Cart not found"
        })
    }
    res.status(200).json({
        message:"Cart fetched successfully",
        cart
    });
}