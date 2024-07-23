"use client";
import ChannelUI from "../../(components)/ChannelUI";

export default function Page() {
  const channelChatting = "Channel Name";

  return (
    <div className="bg-blue-100 h-screen flex items-center justify-center">
      <ChannelUI name={channelChatting} />
    </div>
  );
}
