"use client";
import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import AddFriend from "./(friendui)/AddFriend";
import OnlineFriends from "./(friendui)/OnlineFriends";
import AllFriends from "./(friendui)/AllFriends";
import PendingFriends from "./(friendui)/PendingFriends";
import BlockedUsers from "./(friendui)/BlockedUsers";
import Discover from "./(serverui)/Discover";
import { Categories } from "./(serverui)/Categories";
import Search from "./Search";
import FriendListItem from "./(friendui)/FriendListItem";
import { ButtonContext } from "./(friendui)/FriendListItem";

export const FilteredUserContext = createContext(1);

export default function TemplateUI({ icon, name, category, onclickAddServer }) {
  const [currentCategory, setCurrentCategory] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const { filteredUsers, setFilteredUsers, pendingFriends, setPendingFriends } =
    useContext(FilteredUserContext);
  const [userStatuses, setUserStatuses] = useState({}); // State to hold statuses for each user
  const buttonContextValue = {
    accept: null,
    setAccept: null,
    removeRequest: null,
    setRemoveRequest: null,
    removeFriend: null,
    setRemoveFriend: null,
  };

  useEffect(() => {
    if (filteredUsers) {
      const statuses = {}; // Temporary object to hold statuses for each user
      filteredUsers.forEach((user) => {
        const isFriend = user.allFriends?.includes(currentUser._id);
        const isPending = user.pendingFriends?.includes(currentUser._id);

        console.log(isFriend, isPending);
        if (isFriend) {
          statuses[user._id] = {
            removeFriend: true,
            removeRequest: false,
            accept: false,
            dm: true,
            block: true,
          };
        } else if (isPending) {
          statuses[user._id] = {
            removeFriend: false,
            removeRequest: true,
            add: false,
            block: false,
          };
        } else {
          statuses[user._id] = {
            removeFriend: false,
            removeRequest: false,
            add: true,
          };
        }
      });
      setUserStatuses(statuses); // Update state with the new statuses
    }
  }, [filteredUsers, currentUser]); // Add dependencies

  useEffect(() => {
    if (pendingFriends) {
      const statuses = {}; // Temporary object to hold statuses for each user
      pendingFriends.forEach((user) => {
        statuses[user._id] = {
          accept: true,
          reject: true,
          dm: true,
          block: true,
        };

        setUserStatuses(statuses); // Update state with the new statuses
      });
    }
  }, [pendingFriends, currentUser]); // Add dependencies

  useEffect(() => {
    if (name === "Friends") {
      setCurrentCategory("Add Friend");
    } else {
      setCurrentCategory("Discover");
    }
  }, [name]);

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log(
          "API Key from Environment:",
          process.env.NEXT_PUBLIC_API_KEY
        ); // Log to verify

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

  const handleAcceptFriend = async (userId) => {
    try {
      const response = await fetch(`/api/acceptFriend`, {
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
        throw new Error(`Error accepting friend: ${errorMessage}`);
      }

      // Remove the accepted friend from pendingFriends
      setPendingFriends((prev) => prev.filter((user) => user._id !== userId));

      // Update the status immediately
      handleStatusChange(userId, {
        removeFriend: true,
        removeRequest: false,
        accept: false,
        dm: true,
        block: true,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error accepting friend:", error);
    }
  };

  const handleRejectFriend = async (userId) => {
    try {
      const response = await fetch(`/api/removePendingFriend`, {
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
        throw new Error(`Error rejecting friend: ${errorMessage}`);
      }

      // Remove the rejected friend from pendingFriends
      setPendingFriends((prev) => prev.filter((user) => user._id !== userId));

      // Update the status immediately
      handleStatusChange(userId, {
        removeFriend: false,
        removeRequest: false,
        accept: false,
        dm: false,
        block: true,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error rejecting friend:", error);
    }
  };

  const handleButtonClick = (category) => {
    if (category !== "Categories" && category !== "Create Server")
      setCurrentCategory(category);
  };

  // Category
  const [position, setPosition] = React.useState("home");

  const handleStatusChange = (userId, newStatus) => {
    setUserStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: newStatus,
    }));
  };

  return (
    <ButtonContext.Provider value={buttonContextValue}>
      <div className="h-full flex flex-col justify-start gap-5">
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
              buttonName="Join Server"
              placeholder="You can join servers with server name."
              submitValue={submitValue}
              setSubmitValue={setSubmitValue}
            />
          </div>
        )}
        {currentCategory === "Add Friend" && (
          <div className="flex flex-col gap-4 p-5 mt-5">
            <div className="font-bold text-xl">Add Friend</div>
            <div className="text-gray-400 text-sm">
              Add friends with either their display name or email!
            </div>
            <Search
              buttonName="Send Friend Request"
              placeholder="Search your friends here!"
              submitValue={submitValue}
              setSubmitValue={setSubmitValue}
            />
          </div>
        )}
        {submitValue && <p>{submitValue}</p>}

        {currentCategory === "Online" && <OnlineFriends />}
        {currentCategory === "All" && <AllFriends />}
        {currentCategory === "Pending" && pendingFriends
          ? pendingFriends.map((user) => {
              return (
                <FriendListItem
                  key={user.id}
                  icon={user.icon}
                  name={user.displayName}
                  status={user.onlineStatus === "" ? "" : "online"}
                  email={user.email}
                  userId={user._id}
                  userStatus={
                    userStatuses[user._id] || {
                      removeFriend: false,
                      removeRequest: true,
                      accept: true,
                    }
                  }
                  onStatusChange={handleStatusChange}
                  handleAcceptFriend={() => handleAcceptFriend(user._id)}
                  handleRejectFriend={() => handleRejectFriend(user._id)}
                />
              );
            })
          : ""}
        {currentCategory === "Pending" && !pendingFriends ? <AddFriend /> : ""}
        {currentCategory === "Pending" && pendingFriends.length === 0 ? (
          <AddFriend />
        ) : (
          ""
        )}
        {currentCategory === "Blocked" && <BlockedUsers />}
        {currentCategory === "Add Friend" && !filteredUsers ? (
          <AddFriend />
        ) : (
          ""
        )}
        {currentCategory === "Add Friend" && filteredUsers
          ? filteredUsers.map((user) => {
              return (
                <FriendListItem
                  key={user._id} // Ensure to add a unique key
                  icon={user.icon}
                  name={user.displayName}
                  status={user.onlineStatus === "" ? "" : "online"}
                  email={user.email}
                  userId={user._id}
                  userStatus={
                    userStatuses[user._id] || {
                      removeFriend: false,
                      removeRequest: false,
                      accept: false,
                    }
                  }
                  onStatusChange={handleStatusChange}
                />
              );
            })
          : ""}
        {currentCategory === "Discover" && <Discover position={position} />}
      </div>
    </ButtonContext.Provider>
  );
}
