import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/(backend)/api/auth/[...nextauth]/route";
import LoginPageComponent from "@/app/(frontend)/(components)/login";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import { AuthProvider } from "@/app/AuthProvider";

export const metadata = {
  title: "Sign In to Sync",
  description: "Account Sign-in",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

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
