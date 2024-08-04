import { getToken } from "next-auth/jwt";
import User from "models/user";
import server from "libs/mongodb/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Connecting to the database...");
    await server(); // Ensure the database connection is established
    console.log("Database connected.");

    console.log("Getting token...");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token:", token);

    if (!token) {
      console.log("No token found.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Finding user...");
    const user = await User.findOne({ email: token.email });
    console.log("User:", user);

    if (!user) {
      console.log("User not found.");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const pendingFriends = await User.find({ _id: user.pendingFriends });

    return NextResponse.json(pendingFriends, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
