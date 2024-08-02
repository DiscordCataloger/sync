"use client";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { GoBlocked } from "react-icons/go";
import { IoPersonAddSharp } from "react-icons/io5";

export default function FriendListItem({ icon, name, status, buttons }) {
  return (
    <div className="flex w-full items-center justify-between bg-white rounded-full p-3 px-5 hover:bg-blue-50">
      <div className="flex items-center">
        <img src={icon} className="mr-3 lg:w-14 lg:h-14 w-12 h-12" />
        <div className="flex lg:flex-row flex-col text-lg font-bold">
          {name}
          {status.toLowerCase() === "online" ? (
            <div className="text-green-500 lg:ml-10 flex items-center lg:gap-3 gap-2 font-normal lg:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="mt-1">Online</div>
            </div>
          ) : (
            <div className="text-gray-400 lg:ml-10 flex items-center lg:gap-3 gap-2 font-normal lg:text-base text-sm">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <div className="mt-1">Offline</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {buttons.map((button, index) => {
          if (button.toLowerCase() === "block") {
            return (
              <GoBlocked
                key={index}
                onClick={null}
                className="text-gray-500 hover:text-gray-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
              />
            );
          } else if (button.toLowerCase() === "accept") {
            return (
              <IoPersonAddSharp
                key={index}
                onClick={null}
                className="text-blue-500 hover:text-blue-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
              />
            );
          } else if (button.toLowerCase() === "dm") {
            return (
              <PiChatsFill
                key={index}
                onClick={null}
                className="text-blue-500 hover:text-blue-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
              />
            );
          } else {
            return (
              <RiDeleteBin6Fill
                key={index}
                onClick={null}
                className="text-red-500 hover:text-red-700 cursor-pointer w-6 h-6 md:w-7 md:h-7"
              />
            );
          }

          // let variant = "default";
          // if (button.toLowerCase() === "block") {
          //   variant = "black";
          // } else if (
          //   button.toLowerCase() === "accept" ||
          //   button.toLowerCase() === "dm"
          // ) {
          //   variant = "default";
          // } else {
          //   variant = "red";
          // }
          // return (
          //   <Button
          //     key={index}
          //     size="lg"
          //     variant={variant}
          //     className="w-12 md:w-24 rounded-2xl md:text-sm text-xs text-wrap"
          //   >
          //     {button}
          //   </Button>
          // );
        })}
      </div>
    </div>
  );
}
