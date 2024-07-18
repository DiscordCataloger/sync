"use client";
import AddFriendInput from "./addfriendinput";

export default function AddFriend() {
  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">ADD FRIEND</div>
      <div className="text-gray-400 text-sm">
        You can add friends with their username
      </div>
      <AddFriendInput placeholder="You can add friends with their username" />
    </div>
  );
}
