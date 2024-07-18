"use client";
import FriendListItem from "./friendlistitem";

export default function AllFriends() {
  const buttons = ["Delete Friend"];
  const friendArr = [
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Online",
    },
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Offline",
    },
  ];
  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">All FRIENDS</div>
      <div className="flex flex-col gap-3">
        {friendArr.map((friend, index) => (
          <FriendListItem
            key={index}
            icon={friend.icon}
            name={friend.name}
            status={friend.status}
            buttons={buttons}
          />
        ))}
      </div>
    </div>
  );
}
