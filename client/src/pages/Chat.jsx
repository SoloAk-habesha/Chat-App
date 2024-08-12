import React from "react";
import SearchBar from "../components/chat/SearchBar";
import FolderTab from "../components/chat/FolderTab";
import ChatSection from "../components/chat/ChatSection";

export default function Chat() {
  return (
    <div className="flex divide-x divide-gray-300 w-full h-screen overflow-hidden">
      <div className="w-full md:w-[360px]  flex flex-col h-full px-2">
        <SearchBar />
        <div className="flex-1 overflow-y-auto">
          <FolderTab />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatSection />
      </div>
    </div>
  );
}
