"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatHeader from "./(chatui)/ChatHeader";
import InputMessage from "./InputMessage";
import MessageList from "./(chatui)/MessageList";
import { Josefin_Sans } from "next/font/google";
import { getMessagesMsgs } from "../../../../api/getMessagesMsgs";
import { addMessagesMsg } from "../../../../api/addMessagesMsg";
import { Player } from "@lottiefiles/react-lottie-player";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

const font = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

const NUMBER_OF_MSG_TO_FETCH = 20;
const socket = io("http://localhost:3000");

export default function ChatUI({ messagesId, icon, name, status }) {
  const [msg, setMsg] = useState([]);
  const [offset, setOffset] = useState(NUMBER_OF_MSG_TO_FETCH);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [addMsg, setAddMsg] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [isDragOver, setIsDragOver] = useState(false);

  // Drag and Drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    const newAttachments = files.filter(
      (file) => !attachments.some((attach) => attach.name === file.name)
    );
    setAttachments((prevFiles) => [...prevFiles, ...newAttachments]);
  };

  useEffect(() => {
    const fetchMessagesMsgData = async () => {
      setLoading(true);
      const { msgs } = await getMessagesMsgs(messagesId);
      setMsg(msgs);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchMessagesMsgData();

    socket.on("receiveMessage", (newMessage) => {
      setMsg((prevMsgs) => {
        const messageIndex = prevMsgs.findIndex(
          (msg) => msg.uid === newMessage.uid
        );
        if (messageIndex !== -1) {
          // Update existing message
          const updatedMsgs = [...prevMsgs];
          updatedMsgs[messageIndex] = newMessage;
          return updatedMsgs;
        } else {
          // Add new message
          return [newMessage, ...prevMsgs];
        }
      });
      setOffset((prevOffset) => prevOffset + 1);
      setAddMsg((prevCounter) => prevCounter + 1);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [messagesId]);

  const sendMessage = async () => {
    if (input.trim() || attachments.length > 0) {
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

      const newMsgLocal = {
        msgFrom: "me",
        msgIcon: "/chat_bot.png",
        msgTime: formattedTime,
        msgText: input,
        msgAttach: attachments.length > 0 ? ["loadImg"] : ["noImg"],
        msgUnread: ["User1"],
        uid: uuidv4(),
      };

      // Emit the initial message to live chat & added msg (state) without attachments
      socket.emit("sendMessage", newMsgLocal);

      // Clear the input field and make scroll to bottom
      setInput("");
      // setAddMsg((prevCounter) => prevCounter + 1);

      if (attachments.length > 0) {
        try {
          setAttachments([]);
          const uploadedUrls = await Promise.all(
            attachments.map(async (attach) => {
              const formData = new FormData();
              formData.set("file", attach);
              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });
              if (!res.ok) throw new Error(await res.text());
              const data = await res.json();
              return data.url; // Get the URL from the response
            })
          );
          // console.log(uploadedUrls);
          // Add msgAttach urls after getting url
          const updatedMsg = { ...newMsgLocal, msgAttach: uploadedUrls };

          // Modify live chat & previous added msg (state) with uploadedurls
          socket.emit("sendMessage", updatedMsg);

          // Create newMsg without the uid
          const { uid, ...newMsg } = updatedMsg;
          // console.log("with attachments", newMsg);
          setAddMsg((prevCounter) => prevCounter + 1);
          return await addMessagesMsg(messagesId, newMsg);
        } catch (error) {
          console.log(error);
        }
      }

      // Create newMsg without the uid
      const updatedMsg = { ...newMsgLocal, msgAttach: [] };
      const { uid, ...newMsg } = updatedMsg;
      // console.log("without attachments", newMsg);
      return await addMessagesMsg(messagesId, newMsg);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${font.className} ${
        isDragOver ? "border-2 border-dashed border-blue-500" : "border-none"
      } min-w-[400px] h-full bg-white rounded-2xl flex flex-col shadow-md shadow-sky-400/40`}
    >
      <ChatHeader icon={icon} name={name} status={status} />
      {loading && (
        <div className={`flex flex-col justify-center items-center h-full`}>
          <Player
            autoplay
            loop
            speed="3"
            src="/loader_robot.json"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
      )}
      {!loading && (
        <MessageList
          id={messagesId}
          msg={msg}
          setMsg={setMsg}
          addMsg={addMsg}
          offset={offset}
          setOffset={setOffset}
          NUMBER_OF_MSG_TO_FETCH={NUMBER_OF_MSG_TO_FETCH}
        />
      )}
      <InputMessage
        input={input}
        setInput={setInput}
        attachments={attachments}
        setAttachments={setAttachments}
        sendMessage={sendMessage}
      />
    </div>
  );
}
