import RegisterPageComponent from "@/app/(frontend)/(components)/register";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import "@/app/(frontend)/(components)/slide.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up For an Account on Sync!",
  description: "Account Signup on Sync",
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chat");
  }
  return (
    <SlideProvider>
      <RegisterPageComponent />
    </SlideProvider>
  );
}
