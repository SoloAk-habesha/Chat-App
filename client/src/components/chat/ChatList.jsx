import { Avatar } from "@material-tailwind/react";
import React from "react";

const chatData = [
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  {
    avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
    name: "Tania Andrew",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem ullam, ad ducimus, atque voluptatibus officiis ab aperiam possimus perspiciatis iure asperiores doloremque. Quidem porro dolor, quam saepe sed nemo?",
    date: "date",
  },
  // Add more chat objects here
];
export default function ChatList() {
  return (
    <div className="flex flex-col  divide-y  divide-gray-300 dark:divide-gray-700">
      {chatData.map((chat) => (
        <div
          key={chat.name}
          className="flex items-center px-2 w-full rounded py-2 gap-2 hover:bg-gray-300 dark:hover:bg-gray-700"
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {chat.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
