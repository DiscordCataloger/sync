"use client";
import { useState, useEffect } from "react";
import ChannelHeader from "./(channelui)/ChannelHeader";
import InputMessage from "./(channelui)/InputMessage";
import MessageList from "./(channelui)/MessageList";
import { getChannelMsg } from "@/app/(backend)/getChannelMsg";
import { Titillium_Web } from "next/font/google";

const font = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

export default function ChannelUI({ name }) {
  const initialMsg = getChannelMsg(0, 8);
  const [msg, setMsg] = useState(initialMsg);
  const [input, setInput] = useState("");
  const [addMsg, setAddMsg] = useState(true);

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
      const newMsg = {
        id: Date.now(), // Use timestamp as unique id
        from: "me",
        text: input,
        time: formattedTime,
        icon: "/chat_bot.png",
      };
      setMsg([newMsg, ...msg]);
      setInput("");
      setAddMsg(!addMsg);
    }
  };

  return (
    <div
      className={`${font.className} w-[40%] min-w-[400px] h-[95%] bg-white rounded-2xl flex flex-col shadow-md shadow-sky-400/40`}
    >
      <ChannelHeader name={name} />
      <MessageList msg={msg} setMsg={setMsg} addMsg={addMsg} />
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
