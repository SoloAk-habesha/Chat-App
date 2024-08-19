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
  const [activeTab, setActiveTab] = useState("message");
  const data = [
    {
      label: "All",
      value: "all",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ab nam vel ratione consequatur laudantium, ipsam laboriosam ea magni exercitationem fugit cupiditate suscipit explicabo. Reprehenderit autem expedita laudantium corrupti distinctio.",
    },
    {
      label: "Message",
      value: "message",
      desc: <ChatList />,
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
    <Tabs
      value={activeTab}
      className="flex flex-col h-full divide-y-2 divide-gray-300"
    >
      <TabsHeader
        className="  flex-nowrap overflow-x-auto  scrollbar-hidden whitespace-nowrap border-gray-300 bg-gray-100"
        indicatorProps={{
          className:
            "border-b-[3px] font-medium bg-indigo-50 border-indigo-700 shadow-none rounded-none transition duration-300 ease-in-out",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`py-1 px-3 bg-gray-100 transition duration-300 ease-in-out ${
              activeTab === value ? "text-indigo-700" : "text-gray-700"
            }`}
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
            <div className="h-full max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hidden">
              {desc}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
