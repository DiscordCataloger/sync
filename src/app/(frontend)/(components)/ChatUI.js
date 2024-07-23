"use client";
import { useState, useEffect, useRef } from "react";
import {
  EllipsisVertical,
  Paperclip,
  Laugh,
  SendHorizontal,
} from "lucide-react";
import style from "./ChatUI.module.css";

export default function ChatUI({ icon, name, status, lastSeen }) {
  const [allMessages, setAllMessages] = useState([
    { from: "other", text: "Hey There!", time: "20:30" },
    { from: "other", text: "How are you?", time: "20:30" },
    { from: "me", text: "Hello!", time: "20:33" },
    { from: "me", text: "I am fine and how are you?", time: "20:34" },
    {
      from: "other",
      text: "I am doing well, Can we meet tomorrow?",
      time: "20:36",
    },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "other", text: "Hey There!", time: "20:30" },
    { from: "other", text: "How are you?", time: "20:30" },
    { from: "me", text: "Hello!", time: "20:33" },
    { from: "me", text: "I am fine and how are you?", time: "20:34" },
    {
      from: "other",
      text: "I am doing well, Can we meet tomorrow?",
      time: "20:36",
    },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "other", text: "Hey There!", time: "20:30" },
    { from: "other", text: "How are you?", time: "20:30" },
    { from: "me", text: "Hello!", time: "20:33" },
    { from: "me", text: "I am fine and how are you?", time: "20:34" },
    {
      from: "other",
      text: "I am doing well, Can we meet tomorrow?",
      time: "20:36",
    },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
    { from: "me", text: "Yes Sure!", time: "20:58" },
  ]);

  // limit display only 20 messages
  const [messages, setMessages] = useState(allMessages.slice(-20));
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")}`;
      setAllMessages([
        ...allMessages,
        { from: "me", text: input, time: formattedTime },
      ]);
      setInput("");
    }
  };

  // limit display only 20 messages
  useEffect(() => {
    setMessages(allMessages.slice(-20));
  }, [allMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[40%] h-[90%] bg-white rounded-2xl flex flex-col shadow-md shadow-sky-400/40">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src={icon} className="mr-3 w-16 h-16 rounded-full" />
            <div className="flex flex-col text-lg font-bold text-black">
              {name}
              {status.toLowerCase() === "online" ? (
                <div className="flex items-center gap-3 font-normal text-xs text-gray-400">
                  <div className="flex items-center justify-center text-green-500 gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Online
                  </div>
                  - last seen, {lastSeen}
                </div>
              ) : (
                <div className="flex items-center gap-3 font-normal text-xs text-gray-400">
                  <div className="flex items-center justify-center text-gray-400 gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    Offline
                  </div>
                  - last seen, {lastSeen}
                </div>
              )}
            </div>
          </div>
          <EllipsisVertical className="text-blue-500" />
        </div>
        <div className="flex justify-center items-center">
          <hr className="w-[90%]" />
        </div>

        {/* Messages */}
        <div
          className={`flex-grow p-8 overflow-y-auto ${style.scrollableContent}`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex flex-col ${
                  msg.from === "me" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`py-2 px-5 rounded-3xl text-wrap ${
                    msg.from === "me"
                      ? "bg-blue-500 text-white text-right"
                      : "bg-gray-200 text-black text-left"
                  }`}
                >
                  {msg.text}
                  {index}
                </div>
                <div className="text-xs text-gray-400 mt-1 px-2">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-8 flex gap-5 justify-center items-center">
          <div className="relative w-full">
            <Laugh
              className="text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-600"
              onClick={null}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full px-12 p-3 border rounded-2xl focus:outline-none bg-blue-50 text-black"
              placeholder="Type your message here..."
            />
            <Paperclip
              className="text-blue-500 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-600"
              onClick={null}
            />
          </div>
          <div
            className="text-white bg-blue-500 rounded-xl h-full w-14 flex items-center justify-center relative cursor-pointer hover:bg-blue-600"
            onClick={() => sendMessage()}
          >
            <SendHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
}
