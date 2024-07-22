"use client";
import Login from "@/app/(frontend)/(components)/login";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [slideIn, setSlideIn] = useState(false);

  function handleLoginBack() {
    setSlideIn(!slideIn);
    // Wait for the animation to complete before changing the URL
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <h1 className="mr-[10%] md:text-6xl text-[#A8A8FF] font-bold md:my-[200px] md:w-[700px] md:h-[130px] text-md my-[24px] w-[300px] h-[10px]">
        <Typewriter
          options={{ loop: true }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Start Your Chat Journey Here!")
              .pauseFor(1000)
              .deleteChars(18)
              .typeString("Social Life Here!")
              .pauseFor(1000)
              .deleteChars(17)
              .typeString("Gaming Experience Here!")
              .pauseFor(1000)
              .deleteChars(23)
              .typeString("Work Life Here!")
              .pauseFor(1000)
              .deleteAll()
              .start();
          }}
        />
      </h1>
      <Login />
    </div>
  );
}
