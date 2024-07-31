"use client";

import React from 'react';
const ProfileCard = ({ isOpen, onClose, username, discriminator, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="w-80 mx-auto rounded-lg overflow-hidden shadow-lg absolute z-20 bottom-24 left-20">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-pink-900 text-white py-1 px-3 rounded-full text-xs"
      >
        X
      </button>
      <div className="bg-pink-900 h-16 flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white" style={{ marginLeft: '10px', marginTop: '50px' }}>
          <img
            src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
            alt="Profile Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-purple-100">
        <div>
          <h1 className="text-xl font-semibold text-black text-ls mt-2">{username}</h1>
          <p className="text-gray-500 text-xs">{discriminator}</p>
        </div>
        <button
          onClick={onSave}
          className="mt-4 bg-blue-500 text-white py-2 px-2 rounded-full text-xs"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
