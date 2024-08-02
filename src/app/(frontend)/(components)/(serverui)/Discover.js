// components/Discover.js
import { useState, useEffect } from "react";
import Search from "../Search";
import ServerCard from "./ServerCard";
import { getServers } from "../../../../../api/getServers";

export default function Discover({ position }) {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServerData = async () => {
      const { servers } = await getServers();
      setServers(servers);
    };
    fetchServerData();
  }, []);

  function formatNumber(value) {
    return value.toLocaleString();
  }

  return (
    <>
      <div className="custom-scrollbar -mb-2 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid-flow-row auto-rows-min xl:gap-10 gap-10 h-full overflow-scroll pt-10 px-5 pb-0">
        {position === "home" &&
          servers.map((e, i) => (
            <ServerCard
              key={i}
              icon={e.serverIcon}
              name={e.serverName}
              online={formatNumber(+e.onlineMembers.length)}
              members={formatNumber(+e.members.length)}
            />
          ))}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            display: none; /* Hide scrollbar for WebKit-based browsers */
          }
          .custom-scrollbar {
            -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
            scrollbar-width: none; /* Hide scrollbar for Firefox */
          }
        `}</style>
      </div>
    </>
  );
}
