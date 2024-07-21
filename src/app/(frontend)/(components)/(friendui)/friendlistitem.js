"use client";
import { Button } from "@/components/ui/button";

export default function FriendListItem({ icon, name, status, buttons }) {
  return (
    <div className="flex w-full items-center justify-between bg-white rounded-xl p-3 hover:bg-blue-50">
      <div className="flex items-center">
        <img src={icon} className="mr-3 w-16 h-16" />
        <div className="flex md:flex-row flex-col text-lg font-bold">
          {name}
          {status.toLowerCase() === "online" ? (
            <div className="text-green-500 md:ml-10 flex items-center gap-3 font-normal md:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Online
            </div>
          ) : (
            <div className="text-gray-400 md:ml-10 flex items-center gap-3 font-normal md:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              Offline
            </div>
          )}
        </div>
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
              className="w-12 md:w-24 rounded-2xl md:text-sm text-xs text-wrap"
            >
              {button}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
