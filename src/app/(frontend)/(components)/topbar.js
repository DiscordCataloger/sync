"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddFriend from "./(friendui)/addfriend";
import OnlineFriend from "./(friendui)/onlinefriend";
import AllFriends from "./(friendui)/allfriends";
import PendingFriends from "./(friendui)/pendingfriends";
import BlockedUsers from "./(friendui)/blockedusers";

export default function Topbar({ icon, name, category }) {
  const [currentCategory, setCurrentCategory] = useState("Add Friend");

  const handleButtonClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-4 font-bold md:text-lg text-base items-center">
          {icon}
          {name}
        </div>
        <div className="flex items-center gap-1">
          {category.map((e, i) => (
            <Button
              key={i}
              size="friend"
              variant={currentCategory === e ? "active" : "unset"}
              onClick={() => handleButtonClick(e)}
            >
              {e}
            </Button>
          ))}
        </div>
      </div>

      {currentCategory === "Online" && <OnlineFriend />}
      {currentCategory === "All" && <AllFriends />}
      {currentCategory === "Pending" && <PendingFriends />}
      {currentCategory === "Blocked" && <BlockedUsers />}
      {currentCategory === "Add Friend" && <AddFriend />}
    </>
  );
}
