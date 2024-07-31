import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthHandler } from "@/app/(backend)/api/auth/[...nextauth]/route";

export default async function Chat() {
  const session = await getServerSession(AuthHandler);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
