"use client";
import TemplateUI from "./TemplateUI";
import { FaUserFriends } from "react-icons/fa";

export default function FriendUI() {
  const name = "Friends";
  const category = ["Online", "All", "Pending", "Blocked", "Add Friend"];

  return (
    <div className="h-full pt-3 min-w-[480px]">
      <TemplateUI
        icon={<FaUserFriends className="lg:w-8 lg:h-8 w-6 h-6" />}
        name={name}
        category={category}
      />
    </div>
  );
}
