"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function LoggedInSessionCheck() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession(); // Ensure this is awaited
      const rememberMe = Cookies.get("rememberMe");
      // console.log("Session:", session); // Debugging log
      // console.log("rememberMe cookie:", rememberMe); // Debugging log

      if (session) {
        if (rememberMe) {
          console.log("Redirecting to /chat");
          router.push("/chat");
        } else {
          console.log("Session exists but rememberMe is not set");
          // Handle the case where session exists but rememberMe is not set
        }
      } else {
        console.log("No session found, redirecting to login");
        router.push("/login");
      }
    }

    checkSession();
  }, [router]);

  return null;
}