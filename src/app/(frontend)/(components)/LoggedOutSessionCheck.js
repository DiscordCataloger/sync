"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function LoggedOutSessionCheck() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getSession(); // Ensure this is awaited
        const rememberMe = Cookies.get("rememberMe");
        // console.log("Session:", session); // Debugging log
        // console.log("rememberMe cookie:", rememberMe); // Debugging log

        if (!rememberMe && !session) {
          console.log("Redirecting to /login");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        // Optionally handle the error, e.g., redirect to an error page
      }
    }

    checkSession();
  }, [router]);

  return null;
}
