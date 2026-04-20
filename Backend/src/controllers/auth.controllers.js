import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";


async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, config.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
        message,
        success: true,
        user:{
            _id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

}


export const register = async (req, res) => {
    const { email, contact, password, fullname, isSeller } = req.body;

    try {

        if (!email || !contact || !password || !fullname) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        console.log("EXISTING USER:", existingUser);

        if (existingUser) {
            return res.status(400).json({ 
                message: "User with this email or contact already exists" 
            });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        });

        

        await sendTokenResponse(user, res, "User registered successfully");

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid password"});
    }

    await sendTokenResponse(user, res, "User logged in successfully");


    
};

export const googleCallback = async (req, res) => {
    try {
        const email = req.user.emails[0].value;
        const fullname = req.user.displayName;
        const profilePic = req.user.photos[0].value;
        
        
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await userModel.create({
                email,
                fullname,
                contact: "Google Auth",
                password: Math.random().toString(36).slice(-10) + "A1!"
            });
        }


        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect("http://localhost:5173/");
    } catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect("http://localhost:5173/login");
    }
};
