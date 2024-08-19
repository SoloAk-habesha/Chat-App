import { Avatar, Chip } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, setSelectedChat } from "../../redux/chat/chatSlice.js";
import { formatDistance } from "../../utils/formatDistance";

export default function ChatList() {
  const dispatch = useDispatch();
  const { selectedChat, chatData, loading, error } = useSelector(
    (state) => state.chats
  );
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser._id;

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleClick = (chatId) => {
    const chat = chatData.find((chat) => chat._id === chatId);
    dispatch(setSelectedChat(chat));
  };

  // Format the chat data
  const formattedChats = chatData.map((chat) => {
    const otherParticipant = chat.participants.find(
      (p) => p._id.toString() !== userId.toString()
    );

    return {
      _id: chat._id,
      name: otherParticipant ? otherParticipant.name : "Unknown",
      avatar: otherParticipant ? otherParticipant.profile : "",
      message: chat.lastMessage ? chat.lastMessage.content : "",
      date: chat.lastMessage ? chat.lastMessage.createdAt : new Date(),
    };
  });

  return (
    <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
      {formattedChats.map((chat) => (
        <div
          key={chat._id}
          className="flex items-center px-2 w-full rounded py-2 gap-2 hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => handleClick(chat._id)}
        >
          <Avatar src={chat.avatar} alt="avatar" />
          <div className="flex items-center gap-2 flex-1 justify-between">
            <div>
              <p className="text-md font-medium text-gray-900 dark:text-white">
                {chat.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-52">
                {chat.message}
              </p>
            </div>
            <div className="flex flex-col  items-end gap-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistance(chat.date)}
              </p>
              <span>
                <Chip
                  value="25"
                  size="sm"
                  className="rounded-full bg-indigo-500 text-[10px]"
                />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
