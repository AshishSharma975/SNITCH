import ProductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    console.log("Creating product for seller:", seller._id);
    console.log("Body fields:", { title, priceAmount, priceCurrency });
    console.log("Files received:", req.files?.length || 0);

    const files = req.files || [];
    const images = [];

    // Sequential upload is more stable for multiple large images
    for (const file of files) {
      console.log(`Uploading ${file.originalname}...`);
      try {
        const uploaded = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          mimeType: file.mimetype,
        });
        
        if (uploaded && uploaded.url) {
          images.push({ url: uploaded.url });
          console.log(`Successfully uploaded: ${uploaded.url}`);
        } else {
          console.warn(`Upload failed for ${file.originalname}: Missing URL in result`);
        }
      } catch (uploadErr) {
        console.error(`Error uploading ${file.originalname}:`, uploadErr);
        // We continue with other images if one fails, or you could throw if strict
      }
    }

    if (images.length === 0 && files.length > 0) {
      return res.status(400).json({ message: "All image uploads failed" });
    }

    const product = await ProductModel.create({
      title,
      description,
      price: {
        amount: Number(priceAmount),
        currency: priceCurrency || "INR",
      },
      seller: seller._id,
      images: images,
    });

    console.log("Product created successfully:", product._id);

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error during product creation",
      success: false
    });
  }
}

export async function getSellerProduct(req,res){
  try {
    
  const seller = req.user;

  const products = await ProductModel.find({seller:seller._id})

  return res.status(200).json({
    message:"Products fetched successfully",
    success:true,
    products
  })
  } catch (error) {
    return res.status(500).json({
      message:error.message,
      error:error
    })
  }
}

export async function getAllProduct(req,res){
  try {
    
  const products = await ProductModel.find()

  return res.status(200).json({
    message:"Products get successfully",
    success:true,
    products
  })
  } catch (error) {
    return res.status(500).json({
      message:error.message,
      error:error
    })
  }
}
