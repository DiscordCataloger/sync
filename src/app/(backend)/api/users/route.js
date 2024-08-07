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

    // Extract the user email from the token
    const currentUserEmail = token.email; // Adjust this based on your token structure
    console.log("Current User Email:", currentUserEmail);

    // Find the current user in the database using their email
    const currentUser =
      (await User.findOne({ email: currentUserEmail })) ||
      (await User.findOne({ displayName: token.name }));
    if (!currentUser) {
      console.log("Current user not found in the database.");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Current User ID:", currentUser._id);

    console.log("Finding users...");
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: currentUser._id } });
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
