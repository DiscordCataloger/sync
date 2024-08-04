"use client";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { GoBlocked } from "react-icons/go";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, createContext } from "react";

export const ButtonContext = createContext(null);

export default function FriendListItem({
  icon,
  name,
  status,
  email,
  userId,
  userStatus,
  onStatusChange,
}) {
  const {
    block,
    setBlock,
    accept,
    setAccept,
    dm,
    setDm,
    removeRequest,
    setRemoveRequest,
    removeFriend,
    setRemoveFriend,
  } = useContext(ButtonContext);

  const handleAddFriend = async () => {
    console.log("Adding friend with ID:", userId); // Log the userId

    try {
      const response = await fetch(`/api/addfriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ friendId: userId }), // Send userId as friendId
        credentials: "include", // Include credentials if needed
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error adding friend: ${errorMessage}`);
      }

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
      // Optionally, you can update local state or notify the user here

      // Call the onStatusChange function to update the status
      onStatusChange(userId, {
        removeFriend: false,
        removeRequest: true,
        accept: false,
      });
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between bg-white rounded-full p-3 px-5 hover:bg-blue-50">
      <div className="flex items-center">
        <img
          src={icon ? icon : "/chat_bot.png"}
          className="mr-3 lg:w-14 lg:h-14 w-12 h-12 rounded-[50%]"
        />
        <div className="flex lg:flex-row justify-start flex-col text-lg font-bold">
          {name} ({email})
          {status.toLowerCase() === "online" ? (
            <div className="text-green-500 lg:ml-10 flex items-center lg:gap-3 gap-2 font-normal lg:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="mt-1">Online</div>
            </div>
          ) : (
            <div className="text-gray-400 lg:ml-10 flex items-center lg:gap-3 gap-2 font-normal lg:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <div className="mt-1">Offline</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {userStatus.removeFriend && (
          <RiDeleteBin6Fill
            onClick={() =>
              onStatusChange(userId, {
                removeFriend: false,
                removeRequest: false,
                accept: true,
              })
            }
            className="text-red-500 hover:text-red-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
          />
        )}
        {userStatus.removeRequest && (
          <AiOutlineClose
            onClick={() =>
              onStatusChange(userId, {
                removeFriend: false,
                removeRequest: false,
                accept: true,
              })
            }
            className="text-blue-500 hover:text-blue-950 cursor-pointer w-6 h-6 md:w-7 md:h-7"
          />
        )}
        {userStatus.accept && (
          <IoPersonAddSharp
            onClick={handleAddFriend}
            className="text-blue-500 hover:text-blue-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
          />
        )}
      </div>
    </div>
  );
}
