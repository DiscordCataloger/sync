"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import style from "../ChannelUI.module.css";
import MessageItem from "./MessageItem";
import { useInView } from "react-intersection-observer";
import { getMessagesMsgs } from "../../../../api/getMessagesMsgs";
import { Player } from "@lottiefiles/react-lottie-player";

export default function MessageList({
  id,
  msg,
  setMsg,
  addMsg,
  offset,
  setOffset,
  NUMBER_OF_MSG_TO_FETCH,
  currentUserId,
}) {
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(true); // Loading state

  const loadMoreMsg = async () => {
    try {
      const response = await getMessagesMsgs(
        id,
        offset,
        NUMBER_OF_MSG_TO_FETCH
      );
      if (response && response.msgs) {
        setTimeout(() => {
          setMsg((prevMsg) => [...prevMsg, ...response.msgs]);
          setOffset((prevOffset) => prevOffset + NUMBER_OF_MSG_TO_FETCH);
        }, 500);
      } else {
        console.error('Response does not have the "msgs" property');
      }

      if (!response && response.msgs.length === 0) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [addMsg]);

  useEffect(() => {
    if (inView) {
      loadMoreMsg();
    }
  }, [inView]);

  return (
    <div
      ref={scrollContainerRef}
      className={`flex flex-col-reverse flex-grow p-8 pb-5 overflow-y-auto ${style.scrollableContent}`}
    >
      <div ref={bottomRef}></div>
      {msg &&
        msg.map((message) => (
          <motion.div
            key={message._id || message.uid}
            initial={{
              opacity: 0,
              x: message.userId === currentUserId ? 20 : -20,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className={`flex ${
              message.userId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <MessageItem
              icon={message.msgIcon}
              userName={message.msgFrom}
              text={message.msgText}
              time={message.msgTime}
              file={message.msgAttach}
              userId={message.userId}
              currentUserId={currentUserId}
            />
          </motion.div>
        ))}
      <div ref={ref}>
        {loading && (
          <Player
            autoplay
            loop
            speed="3"
            src="/loader_plane.json"
            style={{
              height: "120px",
              width: "200px",
              marginTop: "-80px",
              marginBottom: "-80px",
            }}
          />
        )}
        {!loading && (
          <Player
            autoplay
            loop
            src="/loader_completed.json"
            style={{
              height: "120px",
              width: "120px",
              marginTop: "-100px",
              marginBottom: "-30px",
            }}
          />
        )}
      </div>
    </div>
  );
}
