"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./slide.css";
import RegisterSocial from "./registersocial";
import { useRouter } from "next/navigation";
import { useSlide } from "../(pages)/(auth)/(slide)/slideProvider";
import Required from "./required";
import { useScreenDetector } from "./useScreenDetector";
import RegisterSocialMobile from "./registerSocialMobile";

export function Register({ handleBack }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameRequired, setDisplayNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [repeatPasswordRequired, setRepeatPassWordRequired] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [displayValidate, setDisplayValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [repeatPasswordValidate, setRepeatPasswordValidate] = useState(false);
  const [accountCheck, setAccountCheck] = useState(false);

  function emailOnChange(e) {
    setEmail(e.target.value);
  }
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  function displayNameOnChange(e) {
    setDisplayName(e.target.value);
  }

  function repeatPasswordOnChange(e) {
    setRepeatPassword(e.target.value);
  }
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (
      !displayNameRequired &&
      !emailRequired &&
      !passwordRequired &&
      !repeatPasswordRequired &&
      !emailValidate &&
      !displayValidate &&
      !passwordValidate &&
      !repeatPasswordValidate
    ) {
      try {
        setAccountCheck(false);
        if (!accountCheck) {
          const resRegister = await fetch("api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              displayName,
              email,
              password,
            }),
          });
          console.log(response.ok);

          if (resRegister.ok) {
            router.push("/login");
          } else {
            console.log("Account registration failed.");
          }
        }

        const resUserCheck = await fetch("api/accountExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserCheck.json();

        if (user) {
          setAccountCheck(true);
        }
      } catch (err) {
        console.log("Error during registration:", err);
      }
    }
  };

  // Functions to check if the input fields are empty
  function onDisplayNameKeyPress(e) {
    if (!e.target.value) {
      setDisplayNameRequired(true);
      setDisplayValidate(false);
    }
    if (!!e.target.value) {
      setDisplayNameRequired(false);
    }
  }

  useEffect(() => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const displayInput = document.getElementById("display-name");
    const repeatPasswordInput = document.getElementById("repeat-password");
    const signUpButton = document.getElementById("signUpButton");

    function emailEmptyCheck(e) {
      if (!e.target.value) {
        setEmailRequired(true);
        setEmailValidate(false);
      } else {
        setEmailRequired(false);
      }
    }

    function passwordEmptyCheck(e) {
      if (!e.target.value) {
        setPasswordRequired(true);
        setPasswordValidate(false);
      } else {
        setPasswordRequired(false);
      }
    }

    function repeatPasswordEmptyCheck(e) {
      if (!e.target.value) {
        setRepeatPassWordRequired(true);
        setRepeatPasswordValidate(false);
      } else {
        setRepeatPassWordRequired(false);
      }
    }

    function displayEmptyCheck(e) {
      if (!e.target.value) {
        setDisplayNameRequired(true);
        setDisplayValidate(false);
      } else {
        setDisplayNameRequired(false);
      }
    }

    function handleSubmit(e) {
      emailEmptyCheck({ target: emailInput });
      passwordEmptyCheck({ target: passwordInput });
      repeatPasswordEmptyCheck({ target: repeatPasswordInput });
      displayEmptyCheck({ target: displayInput });
    }

    emailInput.addEventListener("blur", emailEmptyCheck);
    passwordInput.addEventListener("blur", passwordEmptyCheck);
    repeatPasswordInput.addEventListener("blur", repeatPasswordEmptyCheck);
    displayInput.addEventListener("blur", displayEmptyCheck);
    signUpButton.addEventListener("click", handleSubmit);

    return () => {
      // Clean up the event listener when the component unmounts
      emailInput.removeEventListener("blur", emailEmptyCheck);
      passwordInput.removeEventListener("blur", passwordEmptyCheck);
      repeatPasswordInput.removeEventListener("blur", repeatPasswordEmptyCheck);
      displayInput.removeEventListener("blur", displayEmptyCheck);
      signUpButton.removeEventListener("click", handleSubmit);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Email Validation
  const refEmail = useRef(null);
  useEffect(() => {
    const reEmail =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const handleValidation = (e) => {
      if (refEmail.current.value) {
        if (!refEmail.current || !reEmail.test(refEmail.current.value)) {
          setEmailValidate(true);
        } else {
          setEmailValidate(false);
        }
      }
    };

    const handleBlur = () => {
      handleValidation();
    };

    if (refEmail.current) {
      refEmail.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (refEmail.current) {
        refEmail.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  // Display Name Validation
  const refDisplay = useRef(null);
  useEffect(() => {
    const reDisplay = /^[-_a-zA-Z0-9]{5,}$/;
    const handleValidation = (e) => {
      if (refDisplay.current.value) {
        if (!refDisplay.current || !reDisplay.test(refDisplay.current.value)) {
          setDisplayValidate(true);
        } else {
          setDisplayValidate(false);
        }
      }
    };

    const handleBlur = () => {
      handleValidation();
    };

    if (refDisplay.current) {
      refDisplay.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (refDisplay.current) {
        refDisplay.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  // Password Validation
  const refPassword = useRef(null);
  useEffect(() => {
    const rePassword = /^(?=.*[A-Z])(?=.*[\W_])(.{8,})$/;
    const handleValidation = (e) => {
      if (refPassword.current.value) {
        if (
          !refPassword.current ||
          !rePassword.test(refPassword.current.value)
        ) {
          setPasswordValidate(true);
        } else {
          setPasswordValidate(false);
        }
      }
    };

    const handleBlur = () => {
      handleValidation();
    };

    if (refPassword.current) {
      refPassword.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (refPassword.current) {
        refPassword.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  // repeatPassword Validation
  const refRepeatPassword = useRef(null);
  useEffect(() => {
    const handleValidation = () => {
      if (refRepeatPassword.current.value) {
        if (
          refRepeatPassword.current &&
          refPassword.current.value !== refRepeatPassword.current.value
        ) {
          setRepeatPasswordValidate(true);
        } else {
          setRepeatPasswordValidate(false);
        }
      }
    };

    const handleBlur = (e) => {
      handleValidation(e);
    };

    if (refRepeatPassword.current) {
      refRepeatPassword.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (refRepeatPassword.current) {
        refRepeatPassword.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <div className="flex mt-[5%] md:mt-[0%] justify-end flex-1 w-[80%] shrink-0 md:max-w-[53%]">
      <div
        className={`w-[100%] md:w-[460px] shrink-0 flex flex-col justify-center items-center bg-[#F6F6F6] pt-[12px] md:pt-[24px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-l-lg mt-[20%] md:mt-[5%]`}
      >
        <button
          onClick={handleBack}
          className="relative top-[0.8%] right-[38%] inline -mb-[5%] md:mb-[0px] md:mt-[2px]"
        >
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
        <form noValidate onSubmit={registerSubmit}>
          <div className="flex justify-center items-center">
            <p className="md:-mt-[30px] text-[12px] md:text-[16px] text-[#1E1E1E] text-center">
              Start your journey today!
            </p>
          </div>

          <div className="grid place-content-center">
            <button className="opacity-0 -mt-[120px] relative top-[120px] rounded-[50%] w-[120px] h-[120px] hover:opacity-100 hover:bg-[#134B70]/[0.65] text-center flex flex-col items-center justify-center">
              <p className="text-xl text-[#E1EBE6]">Add</p>
              <p className="text-xl text-[#E1EBE6]">Profile</p>
              <p className="text-xl text-[#E1EBE6]">Pic</p>
            </button>
            <Image
              src="/chat_bot.png"
              height={120}
              width={120}
              alt="avatar"
              className="rounded-[50%]"
            />
          </div>

          <div className="flex flex-col justify-start items-start">
            <label
              for="email"
              className="w-full text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
            >
              Email
              {emailValidate ? (
                <Required error={`Invalid Email Format!`} />
              ) : (
                ""
              )}
              {emailRequired ? <Required error={`Required`} /> : ""}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md md:h-[40px] h-[25px] w-full border-2 border-[#B3B3B3]"
              value={email}
              onChange={emailOnChange}
              ref={refEmail}
            ></input>
          </div>

          <div className="flex flex-col justify-start items-start my-[12px]">
            <label
              for="password"
              className="text-[12px] w-full md:text-[16px] pb-1 text-[#1E1E1E]"
            >
              Display Name
              {displayValidate ? (
                <Required
                  error={`Must have at least 5 characters. Only alphabets, underscores & hyphens allowed.`}
                />
              ) : (
                ""
              )}
              {displayNameRequired ? <Required error={`Required`} /> : ""}
            </label>
            <input
              id="display-name"
              name="display-name"
              type="text"
              placeholder="Display Name"
              className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
              value={displayName}
              onChange={displayNameOnChange}
              ref={refDisplay}
            ></input>
          </div>

          <div className="flex flex-col justify-start items-start  my-[12px]">
            <label
              for
              password="password"
              className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
            >
              Password
              {passwordValidate ? (
                <Required
                  error={`Must have at least 8 characters, 1 special character and 1 uppercase character!`}
                />
              ) : (
                ""
              )}
              {passwordRequired ? <Required error={`Required`} /> : ""}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
              value={password}
              onChange={passwordOnChange}
              ref={refPassword}
            ></input>
          </div>

          <div className="flex flex-col justify-start items-start  my-[12px]">
            <label
              for="repeat-password"
              className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
            >
              Confirm Password
              {repeatPasswordRequired ? <Required error={`Required`} /> : ""}
              {repeatPasswordValidate ? (
                <Required error={`Passwords don't match!`} />
              ) : (
                ""
              )}
            </label>
            <input
              id="repeat-password"
              name="repeat-password"
              type="password"
              placeholder="Confirm Password"
              className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
              value={repeatPassword}
              onChange={repeatPasswordOnChange}
              ref={refRepeatPassword}
            ></input>
            <Button
              id="signUpButton"
              size="default"
              variant="default"
              className="my-[15px] text-[12px] md:text-[16px] bg-[#1D33A8] text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPageComponent() {
  const router = useRouter();
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  let className = `flex flex-col md:min-w-screen md:min-h-screen md:flex-row justify-center items-center`;
  if (typeof window !== "undefined") {
    const registerButtonClicked = localStorage.getItem("registerButtonClicked");
    if (!!registerButtonClicked) {
      className += " slide-from-right";
      setTimeout(() => localStorage.removeItem("registerButtonClicked"), 300);
    }
  }
  const slidetoRight = () => {
    slideRightDispatch({ type: "SLIDETORIGHT" });
    setTimeout(() => {
      router.push("/login");
    }, 400);
    localStorage.setItem("backButtonClicked", "true");
  };

  if (slideRightState.slideRight) {
    className += " slide-to-right";
  }

  const { isMobile, isDesktop } = useScreenDetector();

  return (
    <div className={className}>
      <Register handleBack={slidetoRight} />
      {isMobile && <RegisterSocialMobile />}
      {isDesktop && <RegisterSocial />}
    </div>
  );
}
