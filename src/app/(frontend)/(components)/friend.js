"use client";
import Topbar from "./topbar";
import { Github } from "lucide-react";
import AddFriend from "./addfriend";
import OnlineFriend from "./onlinefriend";
import AllFriends from "./allfriends";
import PendingFriends from "./pendingfriends";
import BlockedUsers from "./blockedusers";

export default function Friend() {
  const name = "Friends";
  const category = ["Online", "All", "Pending", "Blocked", "Add Friend"];
  return (
    <div className="p-5 w-[60%]  min-w-[450px]">
      <Topbar icon={<Github />} name={name} category={category} />
      {/* {category.map((e, i) => ())} */}
      {/* <AddFriend /> */}
      {/* <OnlineFriend /> */}
      {/* <AllFriends /> */}
      {/* <PendingFriends /> */}
      {/* <BlockedUsers /> */}
    </div>
  );
}
