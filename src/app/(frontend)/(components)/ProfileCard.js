"use client";
import { IoCloseCircle } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { VscSaveAs } from "react-icons/vsc";

import React from "react";
const ProfileCard = ({ onClose, username, onSave, onLogout }) => {
  return (
    <div className="w-80 mx-auto rounded-lg overflow-hidden shadow-lg absolute z-20 bottom-10 left-20 border-1 border-gray-500">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white hover:text-red-600  rounded-full text-xs"
      >
        <IoCloseCircle size={25} />
      </button>
      <div className="bg-blue-400 h-16 flex items-center pl-3">
        <div
          className="w-16 h-16 rounded-full overflow-hidden border-4 border-white"
          style={{ marginLeft: "10px", marginTop: "50px" }}
        >
          <img
            src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
            alt="Profile Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 h-20 p-4 pl-6 bg-white">
        <h2 className="text-lg font-semibold text-black text-ls mt-2">
          {username}
        </h2>

        <button
          onClick={onSave}
          className=" text-blue-500 hover:text-blue-700 px-2 rounded-full text-xs mt-2 font-bold"
        >
          <VscSaveAs size={22} />
        </button>
      </div>
      <button
        onClick={onLogout}
        className="absolute bottom-3 right-3 text-red-500 hover:text-red-700 ml-2"
      >
        <TbLogout size={25} />
      </button>
    </div>
  );
};

export default ProfileCard;
