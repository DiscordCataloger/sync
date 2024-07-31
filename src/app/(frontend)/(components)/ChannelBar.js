import React from 'react';
import { FaPinterest } from 'react-icons/fa';

const channels = [
  { name: 'General', notifications: 1 },
  { name: 'Resources', notifications: 0 },
  { name: 'Help', notifications: 0 },
  { name: 'Off-topic', notifications: 0 },
];

const ChannelBar = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-30 w-64 bg-blue-50 p-4 rounded-lg shadow-lg flex flex-col h-[calc(100vh-20px)] my-2 ml-24"
            onClick={onClose} 
        >
          <div className="flex items-center mb-4">
            <FaPinterest className="w-10 h-10 text-red-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">Pinterest</h1>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Channel List</h2>
            <button className="text-xl text-gray-600">+</button>
          </div>
          <div className="mt-2 flex-1 overflow-y-auto">
            {channels.map((channel) => (
              <div key={channel.name} className="flex justify-between items-center py-1">
                <span className="text-gray-600">{`# ${channel.name}`}</span>
                {channel.notifications > 0 && (
                  <span className="bg-orange-500 text-white rounded-full px-2 text-xs">
                    {channel.notifications}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <button className="bg-black text-white py-2 rounded w-full hover:bg-gray-800">
              Delete Server
            </button>
            <button className="bg-red-500 text-white py-2 rounded w-full hover:bg-red-600">
              Leave Server
            </button>
          </div>
        </div>
    );
};

export default ChannelBar;
