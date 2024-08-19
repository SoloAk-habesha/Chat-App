import React from "react";
import SearchBar from "../components/chat/SearchBar";
import FolderTab from "../components/chat/FolderTab";
import ChatSection from "../components/chat/ChatSection";
import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chats);

  return (
    <div className="flex flex-col md:flex-row divide-y md:divide-x divide-gray-300 w-full h-screen overflow-hidden scrollbar-hidden">
      {/* Sidebar (SearchBar and FolderTab) */}
      <div
        className={`flex  flex-col h-full px-2 w-full ${
          selectedChat ? "hidden md:w-80 md:flex" : "md:w-96"
        }`}
      >
        <SearchBar />
        <div className="flex-1 overflow-y-auto">
          <FolderTab />
        </div>
      </div>

      {/* Chat Section */}
      <div
        className={`flex-1 scrollbar-hidden overflow-y-auto ${
          selectedChat ? "block" : "hidden md:block"
        }`}
      >
        {selectedChat ? (
          <ChatSection />
        ) : (
          <div className="flex items-center justify-center h-full">
            No chat selected
          </div>
        )}
      </div>
    </div>
  );
}
