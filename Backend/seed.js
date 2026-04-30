import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import ProductModel from "./src/models/product.model.js";
import UserModel from "./src/models/user.model.js";

const seedData = async () => {
    try {
        await connectDB();
        console.log("Connected to DB...");

        const email = "sidd@gmail.com";
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.error("User not found: ", email);
            process.exit(1);
        }
        console.log("Found seller:", user.fullname, `(${user._id})`);

        // 1. Delete ALL products added by this seller to clean up
        const deleteResult = await ProductModel.deleteMany({ seller: user._id });
        console.log(`Deleted ${deleteResult.deletedCount} products for the user.`);

        // 2. Add 10 premium products with 4-5 images each
        const productsToAdd = [
            {
                title: "Oversized Heavyweight Studio Tee",
                description: "A masterclass in minimalism. Constructed from 300GSM heavy cotton, this oversized tee features a structured silhouette and dropped shoulders for a signature editorial look.",
                priceAmount: 999,
                images: [
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
                    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
                    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
                    "https://images.unsplash.com/photo-1618517351616-389a5e11df3c?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["S", "M", "L", "XL"], color: "Obsidian Black" },
                    { sizes: ["S", "M", "L"], color: "Chalk White" }
                ]
            },
            {
                title: "Textured Linen Resort Shirt",
                description: "Effortless elegance for the warmer months. Woven from premium breathable linen, featuring a relaxed camp collar and pearlescent buttons.",
                priceAmount: 1499,
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=800&q=80",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
                    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
                    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["M", "L", "XL"], color: "Olive Green" },
                    { sizes: ["S", "M", "L"], color: "Sand" }
                ]
            },
            {
                title: "Structured Double-Breasted Blazer",
                description: "Tailoring reimagined. This double-breasted blazer combines classic sartorial codes with a modern, slightly oversized fit. Fully lined with cupro.",
                priceAmount: 4999,
                images: [
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
                    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
                    "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["38", "40", "42"], color: "Midnight Navy" },
                    { sizes: ["38", "40"], color: "Charcoal" }
                ]
            },
            {
                title: "Signature Wide-Leg Trousers",
                description: "The perfect drape. These wide-leg trousers are cut from a fluid wool-blend twill, featuring front pleats and side adjusters for a bespoke fit.",
                priceAmount: 2499,
                images: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
                    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["28", "30", "32", "34"], color: "Stone" },
                    { sizes: ["30", "32", "34"], color: "Black" }
                ]
            },
            {
                title: "Essential French Terry Hoodie",
                description: "Elevated comfort. Made from heavyweight 400GSM French terry cotton. Features a crossover hood, drop shoulders, and a slightly cropped hem.",
                priceAmount: 1899,
                images: [
                    "https://images.unsplash.com/photo-1514866726862-0f081731e63f?w=800&q=80",
                    "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80",
                    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["S", "M", "L", "XL"], color: "Heather Grey" },
                    { sizes: ["M", "L", "XL"], color: "Washed Black" },
                    { sizes: ["S", "M"], color: "Vintage Wash" }
                ]
            },
            {
                title: "Relaxed Fit Denim Jacket",
                description: "A wardrobe staple updated. Washed for a vintage feel with custom branded hardware and distressing at the cuffs and hem.",
                priceAmount: 3299,
                images: [
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
                    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80",
                    "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
                    "https://images.unsplash.com/photo-1528659160538-2780655ed598?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["S", "M", "L"], color: "Light Indigo" },
                    { sizes: ["M", "L", "XL"], color: "Vintage Blue" }
                ]
            },
            {
                title: "Ribbed Knit Polo Collar Sweater",
                description: "A transitional masterpiece. Crafted from a soft merino wool blend, featuring a pronounced ribbed texture and a sleek polo collar without buttons.",
                priceAmount: 2199,
                images: [
                    "https://images.unsplash.com/photo-1539533018447-63fcce26515f?w=800&q=80",
                    "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
                    "https://images.unsplash.com/photo-1559582798-678dfc71ce85?w=800&q=80",
                    "https://images.unsplash.com/photo-1614316982982-f597950cce2d?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["M", "L"], color: "Cream" },
                    { sizes: ["S", "M", "L"], color: "Espresso" }
                ]
            },
            {
                title: "Utility Cargo Pants",
                description: "Function meets form. Constructed from durable ripstop cotton with articulated knees, multiple 3D pockets, and adjustable ankle toggles.",
                priceAmount: 2799,
                images: [
                    "https://images.unsplash.com/photo-1550614000-4b95d4ba6f1b?w=800&q=80",
                    "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=800&q=80",
                    "https://images.unsplash.com/photo-1604160450925-0eecf551fa86?w=800&q=80",
                    "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["30", "32", "34", "36"], color: "Tactical Black" },
                    { sizes: ["28", "30", "32"], color: "Khaki" }
                ]
            },
            {
                title: "Minimalist Leather Sneakers",
                description: "Handcrafted in Portugal from premium full-grain Italian leather. Features a tonal margom sole and waxed cotton laces. Uncompromising quality.",
                priceAmount: 5999,
                images: [
                    "https://images.unsplash.com/photo-1507680434267-3256ba765ce8?w=800&q=80",
                    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
                    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
                    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["UK 7", "UK 8", "UK 9", "UK 10"], color: "Triple White" },
                    { sizes: ["UK 8", "UK 9", "UK 10"], color: "Triple Black" }
                ]
            },
            {
                title: "Silk Blend Resort Wrap Dress",
                description: "Fluid and flattering. This wrap dress is spun from a luxurious silk-viscose blend, draping beautifully with a subtle sheen.",
                priceAmount: 3499,
                images: [
                    "https://images.unsplash.com/photo-1485230895905-ef08ba37ec8c?w=800&q=80",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
                    "https://images.unsplash.com/photo-1572804013309-82a89b4f2596?w=800&q=80",
                    "https://images.unsplash.com/photo-1515347619362-e6fd2a8534c0?w=800&q=80"
                ],
                variantsData: [
                    { sizes: ["XS", "S", "M", "L"], color: "Ruby Red" },
                    { sizes: ["S", "M"], color: "Emerald" }
                ]
            }
        ];

        for (const prod of productsToAdd) {
            // Transform variant data into the schema format
            const dbVariants = [];
            
            for (const vData of prod.variantsData) {
                for (const size of vData.sizes) {
                    dbVariants.push({
                        images: prod.images.map(url => ({ url })),
                        size: size,
                        color: vData.color,
                        stock: Math.floor(Math.random() * 20) + 5, // Random stock between 5 and 24
                        price: {
                            amount: prod.priceAmount,
                            currency: "INR"
                        }
                    });
                }
            }

            const newProduct = new ProductModel({
                title: prod.title,
                description: prod.description,
                price: {
                    amount: prod.priceAmount,
                    currency: "INR"
                },
                seller: user._id,
                images: prod.images.map(url => ({ url })),
                variants: dbVariants
            });

            await newProduct.save();
            console.log(`Created product: ${prod.title} with ${dbVariants.length} variants and ${prod.images.length} images`);
        }

        console.log("Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedData();
