"use client";
import { Button } from "@/components/ui/button";

export default function FriendListItem({ icon, name, status, buttons }) {
  return (
    <div className="flex w-full items-center justify-between bg-white rounded-xl p-3">
      <div className="flex items-center font-bold">
        <img src={icon} className="mr-3 w-16 h-16" />
        {name}
        {status.toLowerCase() === "online" ? (
          <div className="text-green-500 ml-10 flex items-center gap-3 font-normal">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            Online
          </div>
        ) : (
          <div className="text-gray-400 ml-10 flex items-center gap-3 font-normal">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            Offline
          </div>
        )}
      </div>
      <div className="flex gap-3">
        {buttons.map((button, index) => {
          let variant = "default";
          if (button.toLowerCase() === "block") {
            variant = "black";
          } else if (
            button.toLowerCase() === "accept" ||
            button.toLowerCase() === "dm"
          ) {
            variant = "default";
          } else {
            variant = "red";
          }
          return (
            <Button
              key={index}
              size="lg"
              variant={variant}
              className="w-12 lg:w-24 rounded-2xl lg:text-sm text-xs text-wrap"
            >
              {button}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
