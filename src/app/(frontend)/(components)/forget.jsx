"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SlideProvider, {
  useSlide,
} from "../(pages)/(auth)/(slide)/slideProvider";
import { useRouter } from "next/navigation";
import "./slide.css";

export function Forget({ handleBack }) {
  function forgetSubmit() {}
  const [email, setEmail] = useState("");
  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div
      className={`bg-[#F6F6F6] mt-[100px] md:mr-6 w-[300px] md:w-[550px] py-[20px] rounded-lg`}
    >
      <button onClick={handleBack} className="mb-[1px] md:mb-0 md:mt-[4px]">
        <svg
          class="w-[24px] md:w-[36px] md:h-[36px] text-gray-800 dark:text-white inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m14 8-4 4 4 4"
          />
        </svg>

        <span className="text-[12px] md:text-[16px]">Back</span>
      </button>
      <form onSubmit={forgetSubmit}>
        <p className="mx-[24px] -mt-[22px] md:-mt-[30px] text-[12px] md:text-[16px] text-[#1E1E1E] text-center">
          Recover Your Account
        </p>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
          <label
            for="recovery_email"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Recovery Email
          </label>
          <input
            id="recovery_email"
            name="recovery_email"
            type="email"
            placeholder="Recovery Email"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md md:h-[40px] h-[25px] w-full border-2 border-[#B3B3B3]"
            value={email}
            onChange={emailOnChange}
          ></input>
        </div>
        <div className="flex flex-col justify-start items-start mx-[24px] my-[20px]">
          <Button
            size="default"
            variant="default"
            className="text-[12px] md:text-[16px] bg-[#1D33A8] text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full"
          >
            Recover Your Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ForgetPageComponent() {
  const router = useRouter();
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();
  let className = `flex justify-center items-center`;
  const forgetButtonClicked = window.localStorage.getItem(
    "forgetButtonClicked"
  );

  const slidetoRight = () => {
    slideRightDispatch({ type: "SLIDETORIGHT" });
    setTimeout(() => {
      router.push("/login");
    }, 400);
    window.localStorage.setItem("backButtonClicked", "true");
  };

  if (forgetButtonClicked) {
    className += " slide-from-right";
    setTimeout(
      () => window.localStorage.removeItem("forgetButtonClicked"),
      100
    );
  }

  if (slideRightState.slideRight) {
    className += " slide-to-right";
  }

  return (
    <div className={className}>
      <Forget handleBack={slidetoRight} />
    </div>
  );
}
