import { getToken } from "next-auth/jwt";
import User from "models/user";
import server from "libs/mongodb/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req) {
  console.log("Connecting to the database...");
  await server(); // Ensure the database connection is established
  console.log("Database connected.");

  console.log("Getting token...");
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Token:", token);
  try {
    if (!token) {
      console.log("No token found.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract the user ID from the token
    let currentUserId = token.sub; // Adjust this based on your token structure
    console.log("Current User ID:", currentUserId);

    // Convert currentUserId to ObjectId if it's a valid 24-character hex string
    if (mongoose.Types.ObjectId.isValid(currentUserId)) {
      currentUserId = new mongoose.Types.ObjectId(currentUserId);
    } else {
      console.log("Current User ID is not a valid ObjectId.");
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    console.log("Finding users...");
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } });
    console.log("Users:", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
