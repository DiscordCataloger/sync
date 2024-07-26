"use client";

export default function MessageItem({ icon, userName, text, time }) {
  const currentTime = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const todayDate = `${currentTime.getDate()} ${
    months[currentTime.getMonth()]
  } ${currentTime.getFullYear()}`;

  return (
    <div className={`flex justify-start items-center mt-6`}>
      {userName !== "me" && (
        <img
          src={icon}
          className="mr-3 lg:w-12 lg:h-12 w-10 h-10 rounded-full"
        />
      )}

      <div className={`flex flex-col items-start`}>
        <div
          className={`flex w-full justify-between items-center gap-3 text-xs text-gray-400 mt-1 px-2 ${
            userName === "me" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="font-bold">{userName}</div>
          <div>{time.replace(`${todayDate},`, "Today,")}</div>
        </div>
        <div
          style={{ minWidth: `${userName.length * 7 + 140}px` }}
          className={`py-2 px-4 rounded-xl text-wrap ${
            userName === "me"
              ? "bg-blue-500 text-white text-right"
              : "bg-blue-100 text-black text-left"
          }`}
        >
          {text}
        </div>
      </div>

      {userName === "me" && (
        <img
          src={icon}
          className="ml-3 lg:w-12 lg:h-12 w-10 h-10 rounded-full"
        />
      )}
    </div>
  );
}
