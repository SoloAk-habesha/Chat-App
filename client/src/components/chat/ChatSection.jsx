import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  setSelectedChat,
} from "../../redux/chat/chatSlice";
import { useSocketContext } from "../../context/SocketContext";

export default function ChatSection({ onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const { socket, onlineUsers } = useSocketContext();
  const [newMessage, setNewMessage] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [typing, setTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const { selectedChat, messages } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      dispatch(fetchMessages(selectedChat._id));
    };

    const handleTyping = () => {
      setTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 3000); // Stop typing after 3 seconds of inactivity\
    };

    const handleStopTyping = () => {
      setTyping(false);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [socket, dispatch, selectedChat]);

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(fetchMessages(selectedChat._id));
    }
  }, [dispatch, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, textareaRows]);

  const menuItems = [
    { label: "Search", icon: "fa-solid fa-search" },
    { label: "Add Contact", icon: "fa-solid fa-user-plus" },
    { label: "Call", icon: "fa-solid fa-phone" },
    { label: "Mute", icon: "fa-solid fa-volume-xmark" },
    { label: "Select Message", icon: "fa-solid fa-check" },
    { label: "Report", icon: "fa-solid fa-flag" },
    { label: "Block User", icon: "fa-solid fa-ban" },
  ];

  const participants = selectedChat?.participants || [];
  const currentParticipant =
    participants.find((participant) => participant._id !== currentUser._id) ||
    {};

  const handleTyping = () => {
    socket.emit("typing", { receiverId: currentParticipant._id });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const messageData = {
      receiverId: currentParticipant._id,
      content: newMessage,
    };

    dispatch(sendMessage(messageData));
    socket.emit("send_message", messageData);
    setNewMessage("");
    setTextareaRows(1);
    socket.emit("stop_typing", { receiverId: currentParticipant._id });
  };

  const handleTextareaChange = (e) => {
    const textareaLineHeight = 24;
    const minRows = 1;
    const maxRows = 8;

    const previousRows = e.target.rows;
    e.target.rows = minRows;

    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setTextareaRows(currentRows < maxRows ? currentRows : maxRows);
    setNewMessage(e.target.value);
    handleTyping();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="sticky top-0 right-0 dark:bg-gray-800 shadow-md z-20 p-2 flex items-center justify-between">
        <div className="flex items-center px-2 space-x-2">
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              dispatch(setSelectedChat(null));
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </IconButton>

          <Avatar
            size="sm"
            src={currentParticipant.profile || "/images/background.jpg"}
            alt="avatar"
          />
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-900 dark:text-white overflow-wrap break-words">
              {currentParticipant.name || "Unknown User"}
            </p>

            {typing ? (
              <p className="text-xs text-indigo-500 dark:text-indigo-400 animate-wave">
                Typing...
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last seen recently
              </p>
            )}
          </div>
        </div>
        <div>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </IconButton>
            </MenuHandler>
            <MenuList>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  className="p-1 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  <i className={`${item.icon} text-sm`}></i>
                  <p className="text-xs">{item.label}</p>
                </MenuItem>
              ))}
              <MenuItem className="p-1 flex items-center gap-4 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400">
                <i className="fa-solid fa-trash text-sm text-red-600 dark:text-red-400"></i>
                <p className="text-xs">Delete Chat</p>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 bg-cover bg-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => {
              const isCurrentUser =
                message.sender._id === currentUser._id ||
                message.sender === currentUser._id;
              const showAvatarAndName =
                index === 0 ||
                messages[index - 1].sender._id !== message.sender._id;

              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-2 ${
                    isCurrentUser ? "justify-end" : ""
                  }`}
                >
                  {!isCurrentUser && showAvatarAndName && (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={message.sender.profile || "/images/background.jpg"}
                      alt="avatar"
                    />
                  )}

                  <div
                    className={`lg:max-w-[560px] ${
                      !showAvatarAndName && "ml-10"
                    } flex flex-col gap-0 px-3 py-1 text-sm ${
                      isCurrentUser
                        ? "bg-indigo-800 text-gray-100 rounded-l-xl rounded-tr-xl"
                        : "bg-gray-200 text-gray-700 rounded-r-xl border border-gray-300 rounded-tl-xl"
                    }`}
                  >
                    <div className="break-all whitespace-pre-line">
                      {message.content}
                    </div>
                    <span className="ml-auto text-[8px]">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Textarea and send button */}
      <form
        className="w-full border-t flex bg-gray-200 dark:bg-gray-700 shadow-md"
        onSubmit={handleSendMessage}
      >
        <div className="relative flex flex-1 items-center">
          <textarea
            className="flex-1 relative h-auto resize-none overflow-y-auto text-xs  scrollbar-hidden w-full py-3 pl-10 pr-20 border-1 border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-gray-500 focus:outline-none"
            rows={textareaRows}
            value={newMessage}
            onChange={handleTextareaChange}
            placeholder="Write a message"
          />
          <i className="fa-regular fa-face-smile absolute left-4 bottom-0  transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
          <i className="fa-solid fa-paperclip absolute right-12 bottom-0 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
          <button
            className="absolute right-2 bg-indigo-500 bottom-1 disabled:opacity-50 disabled:pointer-events-none w-6 max-w-[40px] h-6 max-h-[40px] text-xs shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="submit"
            disabled={!newMessage.trim()}
          >
            <i className="fas fa-paper-plane text-[10px] text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
