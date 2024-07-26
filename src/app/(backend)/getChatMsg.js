"use client";

export const getChatMsg = (offset, limit) => {
  const data = [
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "40 There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "39 are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "38!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "37 am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "36 am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "35 Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "14Hey There!",
      time: "34 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "33How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "32Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "31I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "30Hey There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "29How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "28Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "27I am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "26I am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "25Yes Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "24Hey There!",
      time: "22 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "23How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "22Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "21I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "20Hey There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "19How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "18Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "17I am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "16I am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "15es Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "14Hey There!",
      time: "22 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "13How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "12Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "11I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "Daniel",
      text: "10Hey There!",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "Jonathan",
      text: "9How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "8Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "7I am fine and how are you?",
      time: "22 Jul 2024, 20:34",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "6I am doing well, Can we meet tomorrow?",
      time: "22 Jul 2024, 20:36",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "5Yes Sure!",
      time: "22 Jul 2024, 20:58",
    },
    {
      from: "other",
      text: "4Hey There!",
      time: "22 Jul 2024, 20:30",
      icon: "/chat_bot.png",
    },
    {
      icon: "/chat_bot.png",
      from: "other",
      text: "3How are you?",
      time: "22 Jul 2024, 20:30",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "2Hello!",
      time: "22 Jul 2024, 20:33",
    },
    {
      icon: "/chat_bot.png",
      from: "me",
      text: "1I am fine and how are you?",
      time: "23 Jul 2024, 20:34",
    },
  ];
  data.forEach((e, i) => (e["id"] = i));
  if (data.length - offset >= 0) {
    const displayData = data.slice(
      data.length - offset - limit < 0 ? 0 : data.length - offset - limit,
      data.length - offset
    );
    return displayData.reverse();
  }
};
