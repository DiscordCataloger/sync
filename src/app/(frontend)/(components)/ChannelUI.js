"use client";
import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import ChannelHeader from "./(channelui)/ChannelHeader";
import InputMessage from "./InputMessage";
import MessageList from "./(channelui)/MessageList";
import { Josefin_Sans } from "next/font/google";
import { getServerChannelMsgs } from "../../../api/getServerChannelMsgs";
import { addServerChannelMsg } from "../../../api/addServerChannelMsg";
import { Player } from "@lottiefiles/react-lottie-player";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import ServerContext from "../(context)/ServerContext";
import { deleteServerChannel } from "../../../api/deleteServerChannel";
import deleteServerChannelfromServer from "../../../api/deleteServerChannelfromServer";

const font = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

const NUMBER_OF_MSG_TO_FETCH = 20;
const socket = io();

export default function ChannelUI({
  channelId,
  name,
  setServerChannels,
  msg,
  setMsg,
}) {
  const { servers, setServers, selectedServer, currentUser } =
    useContext(ServerContext);
  const [offset, setOffset] = useState(NUMBER_OF_MSG_TO_FETCH);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [addMsg, setAddMsg] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [isDragOver, setIsDragOver] = useState(false);
  const [serverMembersExceptCurrentUser, setServerMembersExceptCurrentUser] =
    useState([]);

  useEffect(() => {
    if (selectedServer && channelId) {
      socket.emit("joinServer", { serverId: selectedServer._id });
      socket.emit("joinChannel", { channelId, userId: currentUser._id });
    }

    return () => {
      if (selectedServer && channelId) {
        socket.emit("leaveServer", { serverId: selectedServer._id });
        socket.emit("leaveChannel", { channelId });
      }
    };
  }, [selectedServer, channelId, currentUser]);

  useEffect(() => {
    if (selectedServer && currentUser._id) {
      const serverMembersExceptCurrentUser = selectedServer.members.filter(
        (member) => member !== currentUser._id
      );
      setServerMembersExceptCurrentUser(serverMembersExceptCurrentUser);
    }
  }, [selectedServer]);

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

  const handleDeleteChannel = async () => {
    try {
      await deleteServerChannelfromServer(selectedServer._id, channelId);
      await deleteServerChannel(channelId);
      console.log("channel deleted", channelId);

      const server = servers.find(
        (server) => server._id === selectedServer._id
      );
      const updatedServer = {
        ...server,
        serverChannels: server.serverChannels.filter(
          (channel) => channel !== channelId
        ),
      };
      // Update the server's channels
      setServers(
        servers.map((server) =>
          server._id === selectedServer._id ? updatedServer : server
        )
      );
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  useEffect(() => {
    const fetchServerChannelMsgData = async () => {
      setLoading(true);
      try {
        const response = await getServerChannelMsgs(channelId);
        const { msgs } = response;
        setMsg(msgs);
      } catch (error) {
        console.error("Error fetching server channel messages:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };
    fetchServerChannelMsgData();

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

    socket.on("receiveServerMessage", (newMessage) => {
      const { channelId: messageChannelId } = newMessage;
      // Update the server's channels with the new message
      setServerChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        const channelIndex = updatedChannels.findIndex(
          (channel) => channel._id === messageChannelId
        );
        if (channelIndex !== -1) {
          updatedChannels[channelIndex] = {
            ...updatedChannels[channelIndex],
            channelMsgs: [
              ...updatedChannels[channelIndex].channelMsgs,
              newMessage,
            ],
          };
        }

        // console.log("updatedChannels: ", updatedChannels);
        return updatedChannels;
      });
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("receiveServerMessage");
    };
  }, [channelId, selectedServer, setServerChannels]);

  const sendMessage = async () => {
    if (currentUser && (input.trim() || attachments.length > 0)) {
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
        msgFrom: currentUser.displayName,
        msgIcon: currentUser.icon || "/chat_bot.png",
        msgTime: formattedTime,
        msgText: input,
        msgAttach: attachments.length > 0 ? ["loadImg"] : ["noImg"],
        msgUnread: serverMembersExceptCurrentUser,
        userId: currentUser._id,
        uid: uuidv4(),
      };

      // Emit the initial message to live chat & added msg (state) without attachments
      socket.emit("sendMessage", { channelId, ...newMsgLocal });
      socket.emit("sendServerMessage", {
        serverId: selectedServer._id,
        channelId, // Include the channelId in the message
        ...newMsgLocal,
      });

      // Clear the input field and make scroll to bottom
      setInput("");

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
          const updatedMsg = { ...newMsgLocal, msgAttach: uploadedUrls };

          socket.emit("sendMessage", { channelId, ...updatedMsg });
          socket.emit("sendServerMessage", {
            serverId: selectedServer._id,
            channelId, // Include the channelId in the message
            ...updatedMsg,
          });

          const { uid, ...newMsg } = updatedMsg;
          setAddMsg((prevCounter) => prevCounter + 1);
          return await addServerChannelMsg(channelId, newMsg);
        } catch (error) {
          console.log(error);
        }
      }

      const updatedMsg = { ...newMsgLocal, msgAttach: [] };
      const { uid, ...newMsg } = updatedMsg;

      return await addServerChannelMsg(channelId, newMsg);
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
      <ChannelHeader name={name} handleDeleteChannel={handleDeleteChannel} />
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
          id={channelId}
          msg={msg}
          setMsg={setMsg}
          addMsg={addMsg}
          offset={offset}
          setOffset={setOffset}
          NUMBER_OF_MSG_TO_FETCH={NUMBER_OF_MSG_TO_FETCH}
          currentUserId={currentUser._id}
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
