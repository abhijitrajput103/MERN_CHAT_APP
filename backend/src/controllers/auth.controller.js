import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

//Signup Controller
import axios from "axios";

export const signup = async (req, res) => {
    const { fullname, email, password, recaptchaToken } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (!recaptchaToken) {
            return res.status(400).json({ message: "reCAPTCHA token is missing" });
        }

        // Verify reCAPTCHA token with Google
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

        const response = await axios.post(verificationUrl);
        if (!response.data.success) {
            return res.status(400).json({ message: "Failed reCAPTCHA verification" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilepic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(400).json({ message: "Internal server Error" });
    }
};

//LOGIN Controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilepic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};

// Logout Controller
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully" })
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};

// Update Profile Controller
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId= req.user._id;

        if(!profilePic) {
            return res.status(400).json({ message: "Please add a profile picture" });
        }

       const uploadResponse = await cloudinary.uploader.upload(profilePic)
       const updatedUser = await User.findByIdAndUpdate(userId, {profilepic: uploadResponse.secure_url},
         {new:true});
         res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in Update Profile",error)
        res.status(500).json({ message: "Internal server Error" });
    }
};

//Check Auth
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
        }
        catch (error) {
            console.log("Error in checkAuth", error.message);
            res.status(500).json({ message: "Internal server Error" });
            }
};