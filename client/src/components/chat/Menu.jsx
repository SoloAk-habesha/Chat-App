import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const menuItems = [
    { label: "Push Notifications", icon: "fa-regular fa-bell" },
    { label: "Message", icon: "fa-regular fa-message" },
    { label: "Setting", icon: "fa-solid fa-gear" },
    { label: "Chat app features", icon: "fa-regular fa-circle-question" },
  ];

  return (
    <>
      <IconButton variant="text" color="blue-gray" onClick={openDrawer}>
        <i className="fa-solid fa-bars text-xl text-gray-900 dark:text-white"></i>
      </IconButton>

      <Drawer open={open} onClose={closeDrawer} className="px-0">
        <div className="flex items-center justify-end">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <i className="fa fa-xmark text-sm"></i>
          </IconButton>
        </div>
        <div className="container">
          <div className="container p-1 mx-auto">
            <div className="flex-col flex text-md border-gray-300 dark:border-gray-700">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 gap-6 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  <i className={item.icon}></i>
                  <p className="text-md font-bold  text-gray-800 dark:text-gray-100">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="absolute bottom-4 w-full  text-sm  text-center">
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a
              href="https://soloak.com/"
              class="hover:underline hover:text-indigo-900"
            >
              SoloAk™
            </a>
            . All Rights Reserved.
          </span>
        </p>
      </Drawer>
    </>
  );
}
