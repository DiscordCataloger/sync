"use client";
import { useState } from "react"; // Hook
import { Button } from "@/components/ui/button";
// import style from "./Form.module.css";

export default function AddFriendInput({ placeholder }) {
  const [value, setValue] = useState("");
  const [submiValue, setSubmitValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitValue(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      <input
        id="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full lg:text-sm text-xs rounded-2xl shadow-5 p-5 border-2 h-13 shadow-md shadow-sky-300/50 focus:outline-none"
      />
      <Button
        variant="default"
        size="sm"
        className="absolute right-3 rounded-xl h-10 text-xs"
      >
        Send Friend Request
        {/* <input type="submit" /> */}
      </Button>
      {submiValue && <p>{submiValue}</p>}
    </form>
  );
}
