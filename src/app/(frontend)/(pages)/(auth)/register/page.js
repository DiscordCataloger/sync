import RegisterPageComponent from "@/app/(frontend)/(components)/register";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import "@/app/(frontend)/(components)/slide.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthHandler } from "@/app/(backend)/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Sign Up For an Account on Sync!",
  description: "Account Signup on Sync",
};

export default async function RegisterPage() {
  const session = await getServerSession(AuthHandler);
  if (session) {
    redirect("/chat");
  }
  return (
    <SlideProvider>
      <RegisterPageComponent />
    </SlideProvider>
  );
}
