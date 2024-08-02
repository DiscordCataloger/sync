import { VscCheckAll } from "react-icons/vsc";
import { BsFill1CircleFill } from "react-icons/bs";

const userMessages = ["id1", "id2", "id3"];

const messages = [
  {
    _id: "id1",
    userIds: ["userid1", "userid2"],
    msgs: [
      {
        msgFrom: "User1",
        msgIcon: "/chat_bot.png",
        msgText: "April fool's day",
        msgTime: "Today, 9:52pm",
        msgAttach: [],
        msgUnread: ["userid2"],
      },
      {
        msgFrom: "User1",
        msgIcon: "/chat_bot.png",
        msgText: "April fool's day",
        msgTime: "Today, 9:52pm",
        msgAttach: [],
        msgUnread: ["userid2"],
      },
    ],
  },
  {
    _id: "id2",
    userIds: ["userid1", "userid3"],
    msgs: [
      {
        msgFrom: "User2",
        msgIcon: "/chat_bot.png",
        msgText: "April fool's day",
        msgTime: "Today, 9:52pm",
        msgAttach: [],
        msgUnread: ["userid1"],
      },
      {
        msgFrom: "User2",
        msgIcon: "/chat_bot.png",
        msgText: "April fool's day",
        msgTime: "Today, 9:52pm",
        msgAttach: [],
        msgUnread: ["userid1"],
      },
    ],
  },
  {
    _id: "id3",
    userIds: ["userid1", "userid4"],
    msgs: [
      {
        msgFrom: "User3",
        msgIcon: "/chat_bot.png",
        msgText: "April fool's day",
        msgTime: "Today, 9:52pm",
        msgAttach: [],
        msgUnread: ["userid1"],
      },
    ],
  },
];

const users = [
  {
    _id: "userid1",
    userName: "User1",
    userIcon: "/chat_bot.png",
  },
  {
    _id: "userid2",
    userName: "User2",
    userIcon: "/chat_bot.png",
  },
  {
    _id: "userid3",
    userName: "User3",
    userIcon: "/chat_bot.png",
  },
  {
    _id: "userid4",
    userName: "User4",
    userIcon: "/chat_bot.png",
  },
];

const currentUserId = "userid1";

export default function DirectMessages({
  onclickDmUser,
  selectedMiddleComponent,
}) {
  return (
    <div className="bg-white p-2 rounded-3xl shadow-md shadow-sky-400/40 overflow-hidden flex-1">
      <div className="font-bold text-md p-3 text-black">Direct Messages</div>
      <hr />
      <div className="overflow-y-auto h-full custom-scrollbar">
        {messages.map((message) => {
          const lastMsg = message.msgs[message.msgs.length - 1];
          const unreadCount = message.msgs.filter((msg) =>
            msg.msgUnread.includes(currentUserId)
          ).length;
          const otherUserId = message.userIds.filter(
            (id) => id !== currentUserId
          )[0];
          const icon = users.find((user) => user._id === otherUserId).userIcon;
          const name = users.find((user) => user._id === otherUserId).userName;

          return (
            <div
              key={message._id}
              className={`cursor-pointer message-item flex items-center p-3 hover:bg-blue-200 transition-colors ${
                selectedMiddleComponent === message._id ? "bg-blue-200" : ""
              }`}
              onClick={() => onclickDmUser(message._id)}
            >
              <div className="avatar w-10 h-10 rounded-full mr-3">
                <img src={icon} alt="avatar" />
              </div>
              <div className="details flex-grow">
                <div className="font-bold text-black">{name}</div>
                <div className="text-sm text-gray-400">{lastMsg.msgText}</div>
              </div>
              <div>
                <div className="time text-gray-400 text-sm">
                  {lastMsg.msgTime}
                </div>
                <div
                  style={{
                    color: unreadCount !== 0 ? "red" : "blue",
                  }}
                >
                  {unreadCount !== 0 ? (
                    <div className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center pt-2 pb-2 text-sm">
                      {unreadCount}
                    </div>
                  ) : (
                    <VscCheckAll />
                  )}
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
