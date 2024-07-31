import ForgetPageComponent from "@/app/(frontend)/(components)/forget";
import SlideProvider from "../(slide)/slideProvider";
import { getServerSession } from "next-auth";
import { AuthHandler } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Recovery",
  description: "Account Recovery on Sync",
};

export default async function ForgetCreds() {
  const session = await getServerSession(AuthHandler);
  if (session) {
    redirect("/chat");
  }
  return (
    <SlideProvider>
      <ForgetPageComponent />
    </SlideProvider>
  );
}
