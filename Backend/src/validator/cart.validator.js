import { param,body,validationResult } from "express-validator";

const validaterequest = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

export const cartValidator = [

    param("productId").isMongoId().withMessage("Invalid product ID"),
    param("variantId").isMongoId().withMessage("Invalid variant ID"),
    param("quantity").optional().isInt({min:1}).withMessage("Quantity must be at least 1"),
    param("color").optional().isString().withMessage("Color must be a string"),
    param("size").optional().isString().withMessage("Size must be a string"),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }

];