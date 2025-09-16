import express from "express";
import { getMessage, sendMessage, getUnreadMessages } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/unread").get(isAuthenticated, getUnreadMessages);
router.route("/:id").get(isAuthenticated, getMessage);

export default router;
