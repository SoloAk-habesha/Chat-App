import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ChatList from "./ChatList";

export default function FolderTab() {
  const [activeTab, setActiveTab] = useState("all");
  const data = [
    {
      label: "All",
      value: "all",
      desc: <ChatList />,
    },
    {
      label: "Message",
      value: "message",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ab nam vel ratione consequatur laudantium, ipsam laboriosam ea magni exercitationem fugit cupiditate suscipit explicabo. Reprehenderit autem expedita laudantium corrupti distinctio.",
    },
    {
      label: "Groups",
      value: "groups",
      desc: "sit amet consectetur adipisicing elit. Quos ab nam vel ratione consequatur laudantium, ipsam laboriosam ea magni exercitationem fugit cupiditate suscipit",
    },
    {
      label: "Channels",
      value: "channels",
      desc: " ipsam laboriosam ea magni exercitationem fugit cupiditate suscipit explicabo. Reprehenderit autem expedita laudantium corrupti distinctio.",
    },
    {
      label: "Bots",
      value: "bots",
      desc: " ipsam laboriosam ea magni exercitationem fugit cupiditate suscipit explicabo. Reprehenderit autem expedita laudantium corrupti distinctio.",
    },
  ];

  return (
    <Tabs value={activeTab} className="flex flex-col h-full">
      <TabsHeader
        className="flex sticky overflow-x-auto scrollbar-hidden border-b-2 border-gray-300 bg-gray-100 top-0 z-10 py-0 whitespace-nowrap"
        indicatorProps={{
          className:
            "border-b-[3px]   font-medium bg-indigo-50 border-indigo-700 shadow-none rounded-none transition duration-300 ease-in-out",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={` py-0 px-4 bg-gray-100 transition duration-300 ease-in-out`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="flex-1 overflow-hidden">
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className={`px-0 transition duration-300 ease-in-out ${
              activeTab === value ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-full max-h-[calc(100vh-140px)]  overflow-y-auto scrollbar-hidden">
              {desc}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
