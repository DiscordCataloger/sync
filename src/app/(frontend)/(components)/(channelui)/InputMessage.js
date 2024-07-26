"use client";
import { useState, useRef, useEffect } from "react";
import { Paperclip, Laugh, SendHorizontal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function InputMessage({ input, setInput, sendMessage }) {
  const [isEmoji, setIsEmoji] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiIconRef = useRef(null);

  const toggleEmoji = () => {
    setIsEmoji(!isEmoji);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      !emojiIconRef.current.contains(event.target)
    ) {
      setIsEmoji(false);
    }
  };

  useEffect(() => {
    if (isEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmoji]);

  return (
    <div className="lg:p-4 md:p-3 p-2 flex lg:gap-4 md:gap-3 gap-2 justify-center items-center relative">
      <div className="relative w-full">
        <Laugh
          className="text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-600"
          onClick={() => toggleEmoji()}
          ref={emojiIconRef}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-full px-12 lg:py-3 py-2 border rounded-2xl focus:outline-none bg-blue-50 text-black"
          placeholder="Type your message here..."
          ref={inputRef}
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
      {isEmoji && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10"
        >
          <EmojiPicker
            onEmojiClick={(emoji) => {
              setInput((prevInput) => `${prevInput}${emoji.emoji}`);
              setIsEmoji(false);
              inputRef.current.focus();
            }}
            disableSearchBar
            disableAutoFocus
            emojiStyle="twitter"
          />
        </div>
      )}
    </div>
  );
}
