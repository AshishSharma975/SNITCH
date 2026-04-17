import ProductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const files = req.files || [];

    const images = await Promise.all(
      files.map(async (file) => {
        const uploaded = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });

        return { url: uploaded.url };
      })
    );

    const product = await ProductModel.create({
      title,
      description,
      price: {
        amount: Number(priceAmount),
        currency: priceCurrency || "INR",
      },
      seller: seller._id,
      images: images || [],
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error
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
