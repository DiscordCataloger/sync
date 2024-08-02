import { getSession } from "next-auth/react";
import User from "../../../../../models/user";
import server from "../../../../../libs/mongodb/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await server();
    console.log("Connected to the database");

    const session = await getSession({ req: request });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User fetched:", user);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { message: `Error: ${err.message}` },
      { status: 500 }
    );
  }
}
