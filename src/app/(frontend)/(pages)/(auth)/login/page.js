import { redirect } from "next/navigation";
import LoginPageComponent from "@/app/(frontend)/(components)/login";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import { AuthProvider } from "@/app/AuthProvider";
import { getServerSession } from "next-auth";
import { AuthHandler } from "@/app/(backend)/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Sign In to Sync",
  description: "Account Sign-in",
};

export default async function LoginPage() {
  const session = await getServerSession(AuthHandler);
  if (session) {
    redirect("/chat");
  }

  return (
    <AuthProvider>
      <SlideProvider>
        <LoginPageComponent />
      </SlideProvider>
    </AuthProvider>
  );
}
