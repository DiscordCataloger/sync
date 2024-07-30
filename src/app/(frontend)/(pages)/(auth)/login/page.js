import LoginPageComponent from "@/app/(frontend)/(components)/login";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import { AuthProvider } from "@/app/AuthProvider";
import { authOptions } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In to Sync",
  description: "Account Sign-in",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/chat");
  // }
  return (
    <AuthProvider>
      <SlideProvider>
        <LoginPageComponent />
      </SlideProvider>
    </AuthProvider>
  );
}
