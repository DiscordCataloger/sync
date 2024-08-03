"use client";
import { useState } from "react"; // Hook
import { Button } from "@/components/ui/button";
import { createContext, useContext } from "react";

// import style from "./Form.module.css";
export const FriendContext = createContext(1);

export default function Search({
  placeholder,
  buttonName,
  submitValue,
  setSubmitValue,
  inputIntermediate,
}) {
  const [value, setValue] = useState("");
  // const [submitValue, setSubmitValue] = useState("");

  inputIntermediate = useContext(FriendContext);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitValue(value);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full relative"
      >
        <input
          id="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyUp={inputIntermediate}
          className="w-full lg:text-sm text-xs rounded-2xl shadow-5 p-5 border-2 h-13 shadow-md shadow-sky-300/50 focus:outline-none"
        />
        <Button
          variant="default"
          size="sm"
          className="absolute right-3 rounded-xl h-10 lg:text-sm text-xs text-white lg:w-44 w-24 text-wrap"
        >
          {buttonName}
        </Button>
      </form>
    </>
  );
}
