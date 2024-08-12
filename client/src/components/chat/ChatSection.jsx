import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const initialMessages = [
  {
    id: 1,
    sender: "Penguin UI",
    text: "Hi there! How can I assist you today?",
    time: "11:32 AM",
    isSentByCurrentUser: false,
  },
  {
    id: 2,
    sender: "JS",
    text: "I accidentally deleted some important files. Can they be recovered?",
    time: "11:34 AM",
    isSentByCurrentUser: true,
  },
];

export default function ChatSection() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const menuItems = [
    { label: "Search", icon: "fa-solid fa-search" },
    { label: "Add Contact", icon: "fa-solid fa-user-plus" },
    { label: "Call", icon: "fa-solid fa-phone" },
    { label: "Mute", icon: "fa-solid fa-volume-xmark" },
    { label: "Select Message", icon: "fa-solid fa-check" },
    { label: "Report", icon: "fa-solid fa-flag" },
    { label: "Block User", icon: "fa-solid fa-ban" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      sender: "Current User",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSentByCurrentUser: true,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="sticky top-0 right-0 dark:bg-gray-800 shadow-md z-20 p-2 flex items-center justify-between">
        <div className="flex items-center px-2 space-x-2">
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </IconButton>
          <Avatar size="sm" src="/images/background.jpg" alt="avatar" />
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-900 dark:text-white overflow-wrap break-words">
              Solomon Asefa
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last seen recently
            </p>
          </div>
        </div>
        <div>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </IconButton>
            </MenuHandler>

            <MenuList className="opacity-25">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <MenuItem className="p-1 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100">
                    <i className={`${item.icon} text-sm`}></i>
                    <p className="text-xs text-gray-800 dark:text-gray-100">
                      {item.label}
                    </p>
                  </MenuItem>

                  {index === menuItems.length - 1 && (
                    <hr className="border-gray-300 dark:border-gray-600" />
                  )}
                </React.Fragment>
              ))}

              <MenuItem className="p-1 flex items-center gap-4 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400">
                <i className="fa-solid fa-trash text-sm text-red-600 dark:text-red-400"></i>
                <p className="text-xs text-red-600 dark:text-red-400">
                  Delete Chat
                </p>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 bg-cover bg-center">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.isSentByCurrentUser ? "justify-end" : ""
              }`}
            >
              {!message.isSentByCurrentUser && (
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://penguinui.s3.amazonaws.com/component-assets/avatar-8.webp"
                  alt="avatar"
                />
              )}
              <div
                className={`flex max-w-[70%] flex-col gap-2 p-2 text-sm ${
                  message.isSentByCurrentUser
                    ? "bg-indigo-800 text-gray-100 rounded-l-xl rounded-tr-xl"
                    : "bg-gray-200 text-gray-700 rounded-r-xl border border-gray-300 rounded-tl-xl"
                }`}
              >
                {!message.isSentByCurrentUser && (
                  <span className="font-semibold text-black dark:text-white">
                    {message.sender}
                  </span>
                )}

                <div>{message.text}</div>
                <span className="ml-auto text-xs">{message.time}</span>
              </div>
              {message.isSentByCurrentUser && (
                <span className="flex w-8 h-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100 text-sm font-bold tracking-wider text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  JS
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <form
        className="w-full border-t  flex gap-2 items-center dark:bg-gray-800 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="relative  flex flex-1 items-center">
          <input
            type="text"
            name="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full pl-10 border-2 shadow rounded-2xl h-12 p-4 border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-900 focus:outline-none"
            placeholder="Type message ..."
          />
          <i className="fa-regular fa-face-smile absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
          <i className="fa-solid fa-paperclip absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" />
        </div>
        <button
          className="relative disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-indigo-900 text-white shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
          type="submit"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="fas fa-paper-plane text-white text-xs"></i>
          </span>
        </button>
      </form>
    </div>
  );
}
