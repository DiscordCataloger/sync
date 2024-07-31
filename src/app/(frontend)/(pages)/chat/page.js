import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Chat() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
