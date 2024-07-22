"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import AddFriend from "./(friendui)/addfriend";
// import OnlineFriend from "./(friendui)/onlinefriend";
// import AllFriends from "./(friendui)/allfriends";
// import PendingFriends from "./(friendui)/pendingfriends";
// import BlockedUsers from "./(friendui)/blockedusers";
import Discover from "./(serverui)/Discover";
import { Categories } from "./(serverui)/Categories";

export default function TemplateUI({ icon, name, category, onOpenModal }) {
  // const [currentCategory, setCurrentCategory] = useState("Add Friend");
  const [currentCategory, setCurrentCategory] = useState("Discover");

  const handleButtonClick = (category) => {
    if (category !== "Categories" && category !== "Create Server")
      setCurrentCategory(category);
  };

  // Category
  const [position, setPosition] = React.useState("home");

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-4 font-bold md:text-lg text-base items-center">
          {icon}
          {name}
        </div>
        <div className="flex items-center gap-1">
          {category.map((e, i) =>
            e === "Categories" ? (
              <Categories
                key={i}
                category="Categories"
                position={position}
                setPosition={setPosition}
              />
            ) : e === "Create Server" ? (
              <Button
                key={i}
                size="friend"
                variant="unset"
                onClick={onOpenModal}
              >
                {e}
              </Button>
            ) : (
              <Button
                key={i}
                size="friend"
                variant={currentCategory === e ? "active" : "unset"}
                onClick={() => handleButtonClick(e)}
              >
                {e}
              </Button>
            )
          )}
        </div>
      </div>

      {/* {currentCategory === "Online" && <OnlineFriend />}
      {currentCategory === "All" && <AllFriends />}
      {currentCategory === "Pending" && <PendingFriends />}
      {currentCategory === "Blocked" && <BlockedUsers />}
      {currentCategory === "Add Friend" && <AddFriend />} */}
      {currentCategory === "Discover" && <Discover position={position} />}
    </>
  );
}
