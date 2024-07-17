"use client";
import Login from "@/app/(frontend)/(components)/login";
import Typewriter from "typewriter-effect";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex-col justify-between">
        <h1 className="text-6xl font-bold w-[607px] my-[24px] h-[130px]">
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
    </div>
  );
}
