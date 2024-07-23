"use client";
import { useState } from "react";
import Search from "../Search";
import Image from "next/image";

export default function AddFriend() {
  // Search.js
  const [submitValue, setSubmitValue] = useState("");

  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">ADD FRIEND</div>
      <div className="text-gray-400 text-sm">
        You can add friends with their username.
      </div>
      <Search
        buttonName="Send Friend Request"
        placeholder="You can add friends with their username"
        submitValue={submitValue}
        setSubmitValue={setSubmitValue}
      />
      <div className="flex flex-col items-center justify-center w-full">
        <Image
          width={300}
          height={300}
          alt="Sync.dev friend image"
          src="/friend_robot.png"
        />
        <div className="text-gray-400">
          It's a bit barren over here. Find some friends!
        </div>
      </div>
      {submitValue && <p>{submitValue}</p>}
    </div>
  );
}
