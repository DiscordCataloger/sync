"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import style from "../ChannelUI.module.css";
import MessageItem from "./MessageItem";
import { getChannelMsg } from "@/app/(backend)/getChannelMsg";
import { useInView } from "react-intersection-observer";

const NUMBER_OF_MSG_TO_FETCH = 8;

export default function MessageList({ msg, setMsg, addMsg }) {
  const bottomRef = useRef(null);
  const [offset, setOffset] = useState(NUMBER_OF_MSG_TO_FETCH);
  const { ref, inView } = useInView();

  const loadMoreMsg = async () => {
    const loadMsg = await getChannelMsg(offset, NUMBER_OF_MSG_TO_FETCH);
    if (loadMsg) {
      setTimeout(() => {
        setMsg((prevMsg) => [...prevMsg, ...loadMsg]);
        setOffset((prevOffset) => prevOffset + NUMBER_OF_MSG_TO_FETCH);
      }, 500);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [addMsg]);

  useEffect(() => {
    if (inView) {
      loadMoreMsg();
    }
  }, [inView]);

  return (
    <div
      className={`flex flex-col-reverse flex-grow p-8 pb-5 overflow-y-auto ${style.scrollableContent}`}
    >
      <div ref={bottomRef}></div>
      {msg.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        >
          <MessageItem
            icon={message.icon}
            userName={message.from}
            text={message.text}
            time={message.time}
          />
        </motion.div>
      ))}
      <div ref={ref}></div>
    </div>
  );
}
