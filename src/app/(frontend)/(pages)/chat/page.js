"use client";
import ChatUI from "../../(components)/ChatUI";

export default function Page() {
  const friendChatting = [
    {
      icon: "/chat_bot.png",
      name: "Chuuthiya",
      status: "Offline",
      lastSeen: "Today, 2:31pm",
    },
  ];
  return (
    <div className="bg-blue-100 h-screen">
      <ChatUI
        icon={friendChatting[0].icon}
        name={friendChatting[0].name}
        status={friendChatting[0].status}
        lastSeen={friendChatting[0].lastSeen}
      />
    </div>
  );
}
