"use client";
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import AddFriend from "./(friendui)/AddFriend";
import OnlineFriends from "./(friendui)/OnlineFriends";
import AllFriends from "./(friendui)/AllFriends";
import PendingFriends from "./(friendui)/PendingFriends";
import BlockedUsers from "./(friendui)/BlockedUsers";
import Discover from "./(serverui)/Discover";
import { Categories } from "./(serverui)/Categories";
import Search from "./Search";

export default function TemplateUI({ icon, name, category, onclickAddServer }) {
  const [currentCategory, setCurrentCategory] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  useEffect(() => {
    if (name === "Friends") {
      setCurrentCategory("Add Friend");
    } else {
      setCurrentCategory("Discover");
    }
  }, [name]);

  const handleButtonClick = (category) => {
    if (category !== "Categories" && category !== "Create Server")
      setCurrentCategory(category);
  };

  // Category
  const [position, setPosition] = React.useState("home");

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-center gap-2">
        <div className="flex lg:gap-4 gap-3 font-bold lg:text-lg text-base items-center pl-2">
          {icon}
          {name}
        </div>
        {/* TopBar buttons */}
        <div className="flex items-center lg:gap-1 gap-0">
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
                onClick={onclickAddServer}
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
      {currentCategory === "Discover" && (
        <div className="flex flex-col gap-4 p-5 mt-5">
          <div className="font-bold text-xl">Discover Servers</div>
          <div className="text-gray-400 text-sm">
            You can join servers with server name.
          </div>
          <Search
            buttonName="Search Servers"
            placeholder="You can search servers with server name."
            submitValue={submitValue}
            setSubmitValue={setSubmitValue}
          />
        </div>
      )}
      {currentCategory === "Add Friend" && (
        <div className="flex flex-col gap-4 p-5 mt-5">
          <div className="font-bold text-xl">Add Friend</div>
          <div className="text-gray-400 text-sm">
            You can add friends with their username.
          </div>
          <Search
            buttonName="Send Friend Request"
            placeholder="You can add friends with their username."
            submitValue={submitValue}
            setSubmitValue={setSubmitValue}
          />
        </div>
      )}
      {/* {submitValue && <p>{submitValue}</p>} */}

      {currentCategory === "Online" && <OnlineFriends />}
      {currentCategory === "All" && <AllFriends />}
      {currentCategory === "Pending" && <PendingFriends />}
      {currentCategory === "Blocked" && <BlockedUsers />}
      {currentCategory === "Add Friend" && <AddFriend />}
      {currentCategory === "Discover" && (
        <Discover
          position={position}
          submitValue={submitValue}
          setSubmitValue={setSubmitValue}
        />
      )}
    </div>
  );
}
