import { VscCheckAll } from "react-icons/vsc";
import { BsFill1CircleFill } from "react-icons/bs";
import { getUsers } from "../../../api/getUsers";
import { useState, useEffect } from "react";

// const userMessages = ["id1", "id2", "id3"];

// const messages = [
//   {
//     _id: "id1",
//     userIds: ["userid1", "userid2"],
//     msgs: [
//       {
//         msgFrom: "User1",
//         msgIcon: "/chat_bot.png",
//         msgText: "April fool's day",
//         msgTime: "Today, 9:52pm",
//         msgAttach: [],
//         msgUnread: ["userid2"],
//       },
//       {
//         msgFrom: "User1",
//         msgIcon: "/chat_bot.png",
//         msgText: "April fool's day",
//         msgTime: "Today, 9:52pm",
//         msgAttach: [],
//         msgUnread: ["userid2"],
//       },
//     ],
//   },
//   {
//     _id: "id2",
//     userIds: ["userid1", "userid3"],
//     msgs: [
//       {
//         msgFrom: "User2",
//         msgIcon: "/chat_bot.png",
//         msgText: "April fool's day",
//         msgTime: "Today, 9:52pm",
//         msgAttach: [],
//         msgUnread: ["userid1"],
//       },
//       {
//         msgFrom: "User2",
//         msgIcon: "/chat_bot.png",
//         msgText: "April fool's day",
//         msgTime: "Today, 9:52pm",
//         msgAttach: [],
//         msgUnread: ["userid1"],
//       },
//     ],
//   },
//   {
//     _id: "id3",
//     userIds: ["userid1", "userid4"],
//     msgs: [
//       {
//         msgFrom: "User3",
//         msgIcon: "/chat_bot.png",
//         msgText: "April fool's day",
//         msgTime: "Today, 9:52pm",
//         msgAttach: [],
//         msgUnread: ["userid1"],
//       },
//     ],
//   },
// ];

// const users = [
//   {
//     _id: "userid1",
//     userName: "User1",
//     userIcon: "/chat_bot.png",
//   },
//   {
//     _id: "userid2",
//     userName: "User2",
//     userIcon: "/chat_bot.png",
//   },
//   {
//     _id: "userid3",
//     userName: "User3",
//     userIcon: "/chat_bot.png",
//   },
//   {
//     _id: "userid4",
//     userName: "User4",
//     userIcon: "/chat_bot.png",
//   },
// ];

// const currentUserId = "userid1";

export default function DirectMessages({
  onclickDmUser,
  selectedMiddleComponent,
  currentUser,
  userMessages,
}) {
  // console.log("currentUser", currentUser);
  // console.log("userMessages", userMessages);

  const [users, setUsers] = useState([]);

  // Fetch user library
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
        console.log("userLibData", userLibData);
        if (Array.isArray(userLibData)) {
          // Check if userLibData is an array
          setUsers(userLibData);
        } else {
          console.error("User library data is not an array:", userLibData);
          setUsers([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    }
    fetchUserLibrary();
  }, []);

  // useEffect(() => {
  //   findUsers();
  // }, []);

  return (
    <div className="bg-white p-2 rounded-3xl shadow-md shadow-sky-400/40 overflow-hidden flex-1">
      <div className="font-bold text-md p-3 text-black">Direct Messages</div>
      <hr />
      <div className="overflow-y-auto h-full custom-scrollbar">
        {userMessages.map((message) => {
          const lastMsg = message.msgs[message.msgs.length - 1];
          const unreadCount = message.msgs.filter((msg) =>
            msg.msgUnread.includes(currentUser._id)
          ).length;
          const otherUserId = message.userIds.filter(
            (id) => id !== currentUser._id
          )[0];
          // console.log("otherUserId", otherUserId);
          // console.log("users", users);
          const icon =
            users.find((user) => user._id === otherUserId)?.icon ||
            "/chat_bot.png";
          const name = users.find(
            (user) => user._id === otherUserId
          )?.displayName;

          return (
            <div
              key={message._id}
              className={`cursor-pointer message-item flex items-center p-3 hover:bg-blue-200 transition-colors ${
                selectedMiddleComponent === message._id ? "bg-blue-200" : ""
              }`}
              onClick={() => onclickDmUser(message._id, name, icon)}
            >
              <div className="avatar w-10 h-10 rounded-full mr-3">
                <img src={icon} alt="avatar" />
              </div>
              <div className="details flex-grow">
                <div className="font-bold text-black">{name}</div>
                <div className="text-sm text-gray-400">
                  {lastMsg?.msgText || "No messages"}
                </div>
              </div>
              <div>
                <div className="time text-gray-400 text-sm">
                  {lastMsg?.msgTime || "Start conversation"}
                </div>
                <div
                  style={{
                    color: unreadCount !== 0 ? "red" : "blue",
                  }}
                >
                  {unreadCount !== 0 && (
                    <div className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center pt-2 pb-2 text-sm">
                      {unreadCount}
                    </div>
                  )}
                  {unreadCount === 0 && <VscCheckAll />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: white;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cce6ff;
        }
      `}</style>
    </div>
  );
}
