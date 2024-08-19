const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/send", chatController.sendMessage);

router.get("/:chatId/messages", chatController.getMessages);

router.put("/messages/:messageId/seen", chatController.markAsSeen);
router.get("/", chatController.getChats);
module.exports = router;
