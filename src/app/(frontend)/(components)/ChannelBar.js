import React from "react";

const serverChannels = [
  { channelName: "General", notifications: 1 },
  { channelName: "Resources", notifications: 0 },
  { channelName: "Help", notifications: 0 },
  { channelName: "Off-topic", notifications: 0 },
];

const serverIcon = "/chat_bot.png";

const ChannelBar = ({ onclickChannel, selectedMiddleComponent }) => {
  return (
    <div className="bg-white h-full flex flex-col gap-3 justify-between p-5">
      <div className="flex items-center mb-4">
        <img src={serverIcon} alt="serverIcon" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">Pinterest</h1>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Channel List</h2>
        <button className="text-xl text-gray-600">+</button>
      </div>
      <div className="mt-2 flex-1 overflow-y-auto">
        {serverChannels.map((channel) => (
          <div
            key={channel.channelName}
            className={`flex justify-between items-center py-2 px-2 cursor-pointer hover:bg-blue-100 rounded-xl ${
              selectedMiddleComponent === channel.channelName
                ? "bg-blue-100"
                : "bg-white"
            }`}
            onClick={() => onclickChannel(channel.channelName)}
          >
            <span className="text-gray-600">{`# ${channel.channelName}`}</span>
            {channel.notifications > 0 && (
              <span className="bg-orange-500 text-white rounded-full px-2 text-xs">
                {channel.notifications}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between gap-2">
        <button className="bg-gray-600 text-white py-2 rounded-xl w-full hover:bg-gray-800">
          Delete Server
        </button>
        <button className="bg-red-500 text-white py-2 rounded-xl w-full hover:bg-red-700">
          Leave Server
        </button>
      </div>
    </div>
  );
};

export default ChannelBar;
