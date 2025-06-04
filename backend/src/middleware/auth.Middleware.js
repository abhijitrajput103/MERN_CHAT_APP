import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);    
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Invalid User" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute Middleware: ", error.message);
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token Expired" });
    }
        res.status(500).json({ message: "Internal Server Error" })
    }
};
