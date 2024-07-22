"use client";
import { useState } from "react";
import Search from "../Search";
import ServerCard from "./ServerCard";
import Image from "next/image";

export default function Discover({ position }) {
  const homeServerData = [
    {
      icon: "/chat_bot.png",
      name: "Minecraft",
      online: "321",
      members: "1023",
    },
    {
      icon: "/chat_bot.png",
      name: "Study Group",
      online: "231235",
      members: "135151164",
    },
  ];

  // Search
  const [submitValue, setSubmitValue] = useState("");

  // 123456 to 123,456
  function formatNumber(value) {
    return value.toLocaleString();
  }

  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">Discover Servers</div>
      <div className="text-gray-400 text-sm">
        You can join servers with server name.
      </div>
      <Search
        buttonName="Join Server"
        placeholder="You can join servers with server name."
        submitValue={submitValue}
        setSubmitValue={setSubmitValue}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 grid-flow-row md:gap-5 gap-12 p-5 mt-5">
        {position === "home" &&
          homeServerData.map((e, i) => (
            <ServerCard
              key={i}
              icon={e.icon}
              name={e.name}
              online={formatNumber(+e.online)}
              members={formatNumber(+e.members)}
            />
          ))}
      </div>
      {submitValue && <p>{submitValue}</p>}
    </div>
  );
}
