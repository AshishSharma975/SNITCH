import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import ProductModel from "./src/models/product.model.js";
import UserModel from "./src/models/user.model.js";

const fetchRealProducts = async () => {
    try {
        await connectDB();
        console.log("Connected to DB...");

        const email = "sidd@gmail.com";
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.error("User not found: ", email);
            process.exit(1);
        }
        
        console.log("Found seller:", user.fullname);

        // Clear all previous products by this user
        const deleteResult = await ProductModel.deleteMany({ seller: user._id });
        console.log(`Deleted ${deleteResult.deletedCount} old products.`);

        // Fetch real snitch products
        const response = await fetch("https://www.snitch.co.in/collections/new-arrivals/products.json?limit=12");
        const data = await response.json();
        const products = data.products.slice(0, 10);

        for (const prod of products) {
            // Get all image URLs
            const allImages = prod.images.slice(0, 5).map(img => ({ url: img.src }));
            
            // Reconstruct variants
            const dbVariants = [];
            
            // Try to find size and color from options
            const sizeOption = prod.options.find(opt => opt.name.toLowerCase() === 'size') || { values: ['S', 'M', 'L'] };
            const colorOption = prod.options.find(opt => opt.name.toLowerCase() === 'color') || { values: ['Standard'] };
            
            for (const size of sizeOption.values) {
                dbVariants.push({
                    images: allImages,
                    size: size,
                    color: colorOption.values[0],
                    stock: Math.floor(Math.random() * 20) + 5,
                    price: {
                        amount: prod.variants[0]?.price || 1299,
                        currency: "INR"
                    }
                });
            }

            // Create product
            const newProduct = new ProductModel({
                title: prod.title,
                description: prod.body_html.replace(/<[^>]*>?/gm, '').substring(0, 250) + "...", // Strip HTML
                price: {
                    amount: prod.variants[0]?.price || 1299,
                    currency: "INR"
                },
                seller: user._id,
                images: allImages,
                variants: dbVariants
            });

            await newProduct.save();
            console.log(`Created: ${prod.title} with ${allImages.length} images.`);
        }

        console.log("Real Snitch Seeding Complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error fetching/seeding:", err);
        process.exit(1);
    }
};

fetchRealProducts();
