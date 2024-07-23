"use client";

export const getChannelMsg = (offset, limit) => {
  const data = [
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "Hey There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "I am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "I am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Yes Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "Hey There!",
      time: "22 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "Hey There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "I am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "I am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Yes Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "Hey There!",
      time: "22 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
  ];
  const displayData = data.slice(
    data.length - offset - limit,
    data.length - offset
  );
  return displayData;
};
