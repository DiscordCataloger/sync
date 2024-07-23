"use client";
import { useEffect, useRef, useState } from "react";
import style from "../ChannelUI.module.css";
import MessageItem from "./MessageItem";
import { getChannelMsg } from "@/app/(backend)/getChannelMsg";
import { useInView } from "react-intersection-observer";

const NUMBER_OF_MSG_TO_FETCH = 5;

export default function MessageList({ msg, setMsg }) {
  const bottomRef = useRef(null);

  const [offset, setOffset] = useState(NUMBER_OF_MSG_TO_FETCH);
  const { ref, inView } = useInView();

  const loadMoreMsg = () => {
    const loadMsg = getChannelMsg(offset, NUMBER_OF_MSG_TO_FETCH);
    console.log(loadMsg);
    setMsg([...loadMsg, ...msg]);
    setOffset(offset + NUMBER_OF_MSG_TO_FETCH);
  };

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // useEffect(() => {
  //   if (inView) {
  //     loadMoreMsg();
  //   }
  // }, [inView]);

  return (
    <div className={`flex-grow p-8 overflow-y-auto ${style.scrollableContent}`}>
      {/* <div ref={ref}>Loading...</div> */}
      {msg.map((msg, index) => (
        <MessageItem
          key={index}
          icon={msg.icon}
          userName={msg.from}
          text={msg.text}
          time={msg.time}
        />
      ))}
      <button onClick={loadMoreMsg}>Load more</button>
      <div ref={bottomRef}></div>
    </div>
  );
}
