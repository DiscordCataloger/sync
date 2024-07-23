"use client";
import { Paperclip, Laugh, SendHorizontal } from "lucide-react";

export default function InputMessage({ input, setInput, sendMessage }) {
  return (
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
  );
}
