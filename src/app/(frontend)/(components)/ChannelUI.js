"use client";
import { useState, useEffect } from "react";
import ChannelHeader from "./(channelui)/ChannelHeader";
import InputMessage from "./(channelui)/InputMessage";
import MessageList from "./(channelui)/MessageList";
import { getChannelMsg } from "@/app/(backend)/getChannelMsg";

export default function ChannelUI({ name }) {
  // offset, limit msg
  const initialMsg = getChannelMsg(0, 10);
  const [msg, setMsg] = useState(initialMsg);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const currentTime = new Date();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedTime = `${currentTime.getDate()} ${
        months[currentTime.getMonth()]
      } ${currentTime.getFullYear()}, ${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")}`;
      setMsg([
        ...msg,
        { from: "me", text: input, time: formattedTime, icon: "/chat_bot.png" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="w-[40%] min-w-[480px] h-[95%] bg-white rounded-2xl flex flex-col shadow-md shadow-sky-400/40">
      {/* Header */}
      <ChannelHeader name={name} />

      {/* Messages */}
      <MessageList msg={msg} setMsg={setMsg} />

      {/* Input */}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
