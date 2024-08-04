"use client";
import { useState, useEffect } from "react";
import { Josefin_Sans } from "next/font/google";
import ChannelUI from "../../(components)/ChannelUI";
import ChatUI from "../../(components)/ChatUI";
import Sidebar from "../../(components)/sidebar";
import SearchBar from "../../(components)/Searchbar";
import Menu from "../../(components)/Menu";
import DirectMessages from "../../(components)/Directmessage";
import ChannelBar from "../../(components)/ChannelBar";
import ServerModal from "../../(components)/ServerModal";
import Notification from "../../(components)/Notification";
import ProfileCard from "../../(components)/ProfileCard";
import DirectMessageAdd from "../../(components)/DirectMessageAdd";
import FriendUI from "../../(components)/FriendUI";
import ServerUI from "../../(components)/ServerUI";
import LoggedOutSessionCheck from "../../(components)/LoggedOutSessionCheck";
import getCurrentUser from "../../../../../api/getCurrentUser";
import { ServerProvider } from "../../(context)/ServerContext";
import { ChannelProvider } from "../../(context)/ChannelContext";
import { getUserById } from "../../../../../api/getUserById";
import deleteMsgUnread from "../../../../../api/deleteMsgUnread";

const font = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Page() {
  // const { channelName, setChannelName } = useContext(ChannelContext);
  // const { channelId, setChannelId } = useContext(ChannelContext);
  // const channelChatting = "Channel Name";
  // const channelId = "66a612628172d2d8611febff";
  const friendChatting = [
    {
      icon: "/chat_bot.png",
      name: "Chuuthiya",
      status: "Online",
    },
  ];
  const messagesId = "66aa614bb90bcb9be0a4ec64";

  const [middleComponent, setMiddleComponent] = useState("menu");
  const [rightComponent, setRightComponent] = useState("server");
  const [popupComponent, setPopupComponent] = useState("");
  const [selectedLeftComponent, setSelectedLeftComponent] = useState("chat");
  const [selectedMiddleComponent, setSelectedMiddleComponent] =
    useState("server");
  const [channelName, setChannelName] = useState([]);
  const [channelId, setChannelId] = useState([]);
  const [serverChannels, setServerChannels] = useState([]);

  const handleChatClick = () => {
    setSelectedLeftComponent("chat");
    setSelectedMiddleComponent("server");
    setMiddleComponent("menu");
    setRightComponent("server");
    setChannelId(null);
  };

  const handleServerClick = (index) => {
    setSelectedLeftComponent(index);
    setMiddleComponent("channel");
  };

  const handleChannelClick = async (name, id) => {
    setChannelName(name);
    setChannelId(id);
    setSelectedMiddleComponent(name);
    setRightComponent("channel");

    // Call deleteMsgUnread to remove unread messages for the current user
    const currentUser = await getCurrentUser();
    if (currentUser) {
      await deleteMsgUnread(id, currentUser._id);
    }

    // Update the serverChannels state to remove msgUnread for the current user
    setServerChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel._id === id
          ? {
              ...channel,
              channelMsgs: channel.channelMsgs.map((msg) => ({
                ...msg,
                msgUnread: msg.msgUnread.filter(
                  (userId) => userId !== currentUser._id
                ),
              })),
            }
          : channel
      )
    );
  };

  const handleFriendMenu = () => {
    setSelectedMiddleComponent("friend");
    setRightComponent("friend");
  };

  const handleServerMenu = () => {
    setSelectedMiddleComponent("server");
    setRightComponent("server");
  };

  const handleDmClick = (id) => {
    setSelectedMiddleComponent(id);
    setRightComponent("chat");
  };

  const togglePopupComponent = (component) => {
    setPopupComponent((prevComponent) =>
      prevComponent === component ? "" : component
    );
  };

  return (
    <ServerProvider>
      <div
        className={`${font.className} flex h-screen items-center justify-between p-3 bg-blue-100`}
      >
        <LoggedOutSessionCheck />
        <Sidebar
          onclickChat={handleChatClick}
          onclickServer={handleServerClick}
          onclickAddServer={() => togglePopupComponent("addServer")}
          onclickNotification={() => togglePopupComponent("notification")}
          onclickProfile={() => togglePopupComponent("profile")}
          selectedLeftComponent={selectedLeftComponent}
        />
        {popupComponent && (
          <div>
            {popupComponent === "addServer" && (
              <ServerModal onClose={() => setPopupComponent("")} />
            )}
            {popupComponent === "notification" && (
              <Notification onClose={() => setPopupComponent("")} />
            )}
            {popupComponent === "profile" && (
              <ProfileCard
                onClose={() => setPopupComponent("")}
                username="Chuuthiya"
              />
            )}
            {popupComponent === "directMessageAdd" && (
              <DirectMessageAdd onClose={() => setPopupComponent("")} />
            )}
          </div>
        )}

        {middleComponent === "menu" && (
          <div className="w-[40%] min-w-[360px] min-h-[550px] h-full overflow-hidden mx-3 rounded-2xl flex flex-col gap-3 justify-between">
            <SearchBar />
            <Menu
              onclickDirectMessageAdd={() =>
                togglePopupComponent("directMessageAdd")
              }
              onclickFriend={handleFriendMenu}
              onclickServer={handleServerMenu}
              selectedMiddleComponent={selectedMiddleComponent}
            />
            <DirectMessages
              onclickDmUser={handleDmClick}
              selectedMiddleComponent={selectedMiddleComponent}
            />
          </div>
        )}
        {middleComponent === "channel" && (
          <div className="w-[40%] min-w-[320px] h-full overflow-hidden mx-3 rounded-2xl shadow-md shadow-sky-400/40">
            <ChannelBar
              selectedMiddleComponent={selectedMiddleComponent}
              selectedLeftComponent={selectedLeftComponent}
              handleChatClick={handleChatClick}
              handleChannelClick={handleChannelClick}
              serverChannels={serverChannels}
              setServerChannels={setServerChannels}
            />
          </div>
        )}

        {rightComponent === "chat" && (
          <div className="h-full w-full">
            <ChatUI
              messagesId={messagesId}
              icon={friendChatting[0].icon}
              name={friendChatting[0].name}
              status={friendChatting[0].status}
            />
          </div>
        )}
        {rightComponent === "channel" && (
          <div className="h-full w-full">
            <ChannelUI
              channelId={channelId}
              name={channelName}
              serverChannels={serverChannels}
              setServerChannels={setServerChannels}
            />
          </div>
        )}
        {rightComponent === "friend" && (
          <div className="h-full w-full">
            <FriendUI />
          </div>
        )}
        {rightComponent === "server" && (
          <div className="w-full h-full">
            <ServerUI
              onclickAddServer={() => togglePopupComponent("addServer")}
            />
          </div>
        )}
      </div>
    </ServerProvider>
  );
}
