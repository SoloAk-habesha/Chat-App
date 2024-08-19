const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const { userSocketMap } = require("../socket/socket");

const { errorHandler } = require("../utils/error");

const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// Send a message
exports.sendMessage = async (req, res, next) => {
  try {
    const { content, receiverId } = req.body;
    const senderId = req.user._id;

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(errorHandler(404, "Receiver not found"));

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = new Chat({ participants: [senderId, receiverId] });
      await chat.save();
    }

    const newMessage = new Message({
      chatId: chat._id,
      sender: senderId,
      content,
    });
    const savedMessage = await newMessage.save();

    chat.messages.push(savedMessage._id);
    chat.lastMessage = savedMessage._id;
    await chat.save();

    const io = req.app.get("io");
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", savedMessage);
    }
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (error) {
    next(errorHandler(500, "Error sending message"));
  }
};

// Fetch all messages in a chat
exports.getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate(
      "sender",
      "name email profile"
    );

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(errorHandler(500, "Error fetching messages"));
  }
};

// Mark a message as seen
exports.markAsSeen = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { seen: true },
      { new: true }
    );

    if (!message) return next(errorHandler(404, "Message not found"));

    res.status(200).json({
      success: true,
      message: "Message marked as seen",
      data: message,
    });
  } catch (error) {
    next(errorHandler(500, "Error marking message as seen"));
  }
};

// Get chats
exports.getChats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ participants: userId })
      .populate({ path: "participants", select: "name profile" })
      .populate({ path: "lastMessage", select: "content createdAt" });

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    next(errorHandler(500, "Error fetching chats"));
  }
};
