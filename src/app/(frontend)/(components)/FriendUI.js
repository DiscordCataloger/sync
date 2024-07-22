"use client";
import Topbar from "./topbar";
import { Github } from "lucide-react";

export default function FriendUI() {
  const name = "Friends";
  const category = ["Online", "All", "Pending", "Blocked", "Add Friend"];

  return (
    <div className="p-5  min-w-[500px]">
      <Topbar icon={<Github size="30" />} name={name} category={category} />
    </div>
  );
}
