import express from "express";
import { protectRoute } from "../middleware/auth.Middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


//Get Users
router.get("/users",protectRoute,getUsersForSidebar);

//Get Messages
router.get("/:id",protectRoute,getMessages);

//Post Message
router.post("/send/:id",protectRoute,sendMessage);




export default router;