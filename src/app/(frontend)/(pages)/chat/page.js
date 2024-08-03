"use client";
import { useState, useEffect, useRef } from "react";
import { Josefin_Sans } from "next/font/google";
import ChannelUI from "../../(components)/ChannelUI";
import ChatUI from "../../(components)/ChatUI";
import { addServerChannel } from "../../../../../api/addServerChannel";
import { deleteServerChannel } from "../../../../../api/deleteServerChannel";
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
import { FriendContext } from "../../(components)/Search";
import { FilteredUserContext } from "../../(components)/TemplateUI";

const font = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Page() {
  const channelChatting = "Channel Name";
  const channelId = "66a612628172d2d8611febff";
  const friendChatting = [
    {
      icon: "/chat_bot.png",
      name: "Chuuthiya",
      status: "Online",
    },
  ];
  const messagesId = "66aa614bb90bcb9be0a4ec64";

  // // add channel with name, return channelId
  // useEffect(() => {
  //   async function createChannel() {
  //     const newChannel = await addServerChannel("7Channel");
  //     console.log("New channel ID:", newChannel._id);
  //   }
  //   createChannel();
  // }, []);

  // // delete channel with id
  // async function RemoveChannel() {
  //   await deleteServerChannel("66aa3ec3bdca963403cb1a6d");
  // }
  const [middleComponent, setMiddleComponent] = useState("menu");
  const [rightComponent, setRightComponent] = useState("server");
  const [popupComponent, setPopupComponent] = useState("");
  const [selectedLeftComponent, setSelectedLeftComponent] = useState("chat");
  const [selectedMiddleComponent, setSelectedMiddleComponent] =
    useState("server");
  const [channelName, setChannelName] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [userLib, setUserLib] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const filteredUserContextValue = {
    filteredUsers,
    setFilteredUsers,
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Include the API key in the headers
          },
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const userData = await response.json();
        // console.log("Fetched User Data:", userData); // Log to verify fetched data
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUserLibrary() {
      try {
        const response = await fetch(`/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Include the API key in the headers
          },
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const userLibData = await response.json();
        setUserLib(userLibData);
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    }
    fetchUserLibrary();
  }, []);

  const handleChatClick = () => {
    setSelectedLeftComponent("chat");
    setSelectedMiddleComponent("server");
    setMiddleComponent("menu");
    setRightComponent("server");
  };

  const handleServerClick = (index) => {
    setSelectedLeftComponent(`server-${index}`);
    setMiddleComponent("channel");
    setChannelName("channelName");
    setRightComponent("channel");
  };

  const handleChannelClick = (name) => {
    setSelectedMiddleComponent(name);
    setChannelName(name);
    setRightComponent("channel");
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

  const inputIntermediate = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      setFilteredUsers(
        userLib.filter(
          (user) =>
            user.email.toLowerCase().includes(searchValue) ||
            user.displayName.toLowerCase().includes(searchValue)
        )
      );
    } else {
      setFilteredUsers(null);
    }
  };

  return (
    // <div className="bg-blue-100 h-screen flex items-center justify-center">
    //   <ChannelUI channelId={channelId} name={channelChatting} />
    //   {/* <ChatUI
    //     messagesId={messagesId}
    //     icon={friendChatting[0].icon}
    //     name={friendChatting[0].name}
    //     status={friendChatting[0].status}
    //   /> */}
    // </div>
    <FriendContext.Provider value={(e) => inputIntermediate(e)}>
      <FilteredUserContext.Provider value={filteredUserContextValue}>
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
                onclickChannel={handleChannelClick}
                selectedMiddleComponent={selectedMiddleComponent}
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
              <ChannelUI channelId={channelId} name={channelName} />
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
      </FilteredUserContext.Provider>
    </FriendContext.Provider>
  );
}
