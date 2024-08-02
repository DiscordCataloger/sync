import React from "react";
import { IoIosClose } from "react-icons/io";

const ServerModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black z-30">
      <div className="bg-blue-50 rounded-lg p-6 w-96 shadow-lg relative">
        <IoIosClose
          className="absolute top-4 right-4 text-black cursor-pointer hover:text-red-600"
          size={24}
          onClick={onClose}
        />
        <h2 className="text-lg font-semibold text-center">
          Customize Your Server
        </h2>
        <p className="mt-2 text-gray-600 text-xs">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </p>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center my-4 border-dashed border-2 border-gray-400 p-4 rounded-full w-24 h-24">
            <div className="text-4xl">+</div>
            <span className="text-gray-500">UPLOAD</span>
          </div>
        </div>
        <p className="text-xs">Server Name</p>
        <input
          type="text"
          placeholder="SERVER NAME"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <p className="text-[10px] mb-2">
          By creating a server, you agree to Discord's{" "}
          <a href="#" className="text-blue-500">
            Community Guidelines.
          </a>
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <select className="border border-gray-300 rounded-md p-2 w-24">
            <option value="Game">Game</option>
            <option value="Community">Community</option>
            <option value="Study">Study</option>
          </select>
          <button
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 w-full"
            onClick={onClose}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerModal;
