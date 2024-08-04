import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channelName, setChannelName] = useState(null);
  const [channelId, setChannelId] = useState(null);

  return (
    <ChannelContext.Provider value={{}}>{children}</ChannelContext.Provider>
  );
};

export default ChannelContext;
