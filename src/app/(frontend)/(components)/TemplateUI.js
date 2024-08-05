"use client";
import * as React from "react";
import { useState, useEffect } from "react";
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
import { FaLess } from "react-icons/fa";
// import { ButtonContext } from "./(friendui)/FriendListItem";

export default function TemplateUI({ icon, name, category, onclickAddServer }) {
  const [currentCategory, setCurrentCategory] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [userLib, setUserLib] = useState([]); // Initialize with an empty array
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [userStatuses, setUserStatuses] = useState({}); // State to hold statuses for each user

  // Fetch current user
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
        if (userData) {
          // Check if userData is not null
          setCurrentUser(userData);
        } else {
          console.error("User data is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  // Fetch filtered users
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
        if (Array.isArray(userLibData)) {
          // Check if userLibData is an array
          setUserLib(userLibData);
        } else {
          console.error("User library data is not an array:", userLibData);
          setUserLib([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    }
    fetchUserLibrary();
  }, []);

  const inputIntermediate = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log("Search value:", searchValue); // Log the search value

    if (searchValue) {
      const filtered = userLib.filter(
        (user) =>
          user.email.toLowerCase().includes(searchValue) ||
          user.displayName.toLowerCase().includes(searchValue)
      );
      console.log("Filtered users:", filtered); // Log the filtered users
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  // Now it's safe to access currentUser properties
  useEffect(() => {
    if (filteredUsers && currentUser) {
      const statuses = {}; // Temporary object to hold statuses for each user
      filteredUsers.forEach((user) => {
        const isFriend = user.allFriends?.includes(currentUser._id);
        const isPending = user.pendingFriends?.includes(currentUser._id);

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
            dm: true,
          };
        } else {
          statuses[user._id] = {
            removeFriend: false,
            removeRequest: false,
            add: true,
            dm: true,
            block: true,
          };
        }
      });

      setUserStatuses(statuses); // Update state with the new statuses
    }
  }, [filteredUsers, currentUser]); // Add pendingFriends as a dependency

  // Fetch pending friends
  useEffect(() => {
    async function fetchPendingFriends() {
      try {
        const response = await fetch(`/api/pendingFriends`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const pendingFriendData = await response.json();
        // Ensure pendingFriendData is an array
        if (Array.isArray(pendingFriendData)) {
          setPendingFriends(pendingFriendData);
        } else {
          console.error(
            "Pending friends data is not an array:",
            pendingFriendData
          );
          setPendingFriends([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching pending friends:", error);
      }
    }
    fetchPendingFriends();
  }, [pendingFriends, currentUser]);

  // Log pendingFriends to see updates
  useEffect(() => {
    console.log("Updated pendingFriends:", pendingFriends);
  }, [pendingFriends]);

  useEffect(() => console.log(pendingFriends), [pendingFriends]);

  useEffect(() => {
    if (name === "Friends") {
      setCurrentCategory("Add Friend");
    } else {
      setCurrentCategory("Discover");
    }
  }, [name]);

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
    console.log("Rejecting friend request for user ID:", userId); // Log the userId

    try {
      const response = await fetch(`/api/rejectRequest`, {
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
      setPendingFriends((prev) => {
        const updatedPendingFriends = prev.filter(
          (user) => user._id !== userId
        );
        console.log(
          "Updated pendingFriends after rejection:",
          updatedPendingFriends
        );
        return updatedPendingFriends;
      });

      // Update the status immediately
      handleStatusChange(userId, {
        removeRequest: false,
        accept: false,
        add: true,
        dm: true,
        block: true,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error rejecting friend:", error);
    }
  };

  const handleAddFriend = async (userId) => {
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

      // Update userStatuses immediately
      handleStatusChange(userId, {
        removeFriend: false,
        removeRequest: true,
        add: false,
        dm: true,
        block: false,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleRemoveRequest = async (userId) => {
    console.log("Removing request for user ID:", userId); // Log the userId

    try {
      const response = await fetch(`/api/removeRequest`, {
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
        throw new Error(`Error removing friend request: ${errorMessage}`);
      }

      // Remove the request from pendingFriends
      setPendingFriends((prev) => prev.filter((user) => user._id !== userId));

      // Update the status immediately
      handleStatusChange(userId, {
        removeFriend: false,
        removeRequest: false,
        add: true,
        dm: true,
        block: true,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error removing friend request:", error);
    }
  };

  const handleRemoveFriend = async (userId) => {
    console.log("Removing friend with ID:", userId); // Log the userId

    try {
      const response = await fetch(`/api/removeFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ friendId: userId }), // Ensure friendId is included
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error removing friend: ${errorMessage}`);
      }

      // Assuming the response contains the removed friend data
      const removedFriend = await response.json(); // Get the removed friend data from the response

      // Update pendingFriends immediately
      setPendingFriends((prev) =>
        prev.filter((user) => user._id !== removedFriend._id)
      ); // Remove the friend from the pendingFriends array

      // Update userStatuses immediately
      handleStatusChange(userId, {
        removeFriend: false,
        removeRequest: false,
        add: true,
        dm: true,
        block: true,
      });

      const result = await response.text(); // Get the response text
      console.log(result); // Log success message
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleButtonClick = (category) => {
    if (category !== "Categories" && category !== "Create Server")
      setCurrentCategory(category);
  };

  // Category
  const [position, setPosition] = useState("home");

  const handleStatusChange = (userId, newStatus) => {
    setUserStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: newStatus,
    }));
  };

  return (
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
            inputIntermediate={(e) => inputIntermediate(e)}
          />
        </div>
      )}
      {submitValue && <p>{submitValue}</p>}

      {currentCategory === "Online" && <OnlineFriends />}
      {currentCategory === "All" && allFriends.length === 0 ? (
        <AddFriend />
      ) : (
        ""
      )}
      {currentCategory === "All" && !allFriends ? <AddFriend /> : ""}
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
                userStatus={{
                  accept: true,
                  reject: true,
                  dm: true,
                  block: true,
                }}
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
      {currentCategory === "Add Friend" && !filteredUsers ? <AddFriend /> : ""}
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
                userStatus={userStatuses[user._id] || {}} // Use filteredStatuses for filtered users
                handleAddFriend={() => handleAddFriend(user._id)}
                handleRemoveFriend={() => handleRemoveFriend(user._id)}
                handleRemoveRequest={() => handleRemoveRequest(user._id)}
                onStatusChange={handleStatusChange}
              />
            );
          })
        : ""}
      {currentCategory === "Discover" && <Discover position={position} />}
    </div>
  );
}
