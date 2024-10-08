import User from "models/user"; // Adjust the import path as necessary
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextResponse } from "next/server";

async function connectToDatabase() {
  await mongoose.connect(process.env.MONGODB_URI); // Ensure you have your MongoDB URI set
}

async function getUserFromToken(req) {
  const token = await getToken({ req }); // Get the token from the request
  if (!token || !token.sub) throw new Error("Unauthorized");

  // Extract the user email from the token
  const currentUserEmail = token.email; // Adjust this based on your token structure
  console.log("Current User Email:", currentUserEmail);

  // Find the current user in the database using their email
  const currentUser =
    (await User.findOne({ email: currentUserEmail })) ||
    (await User.findOne({ githubId: token.sub }));
  if (!currentUser) {
    console.log("Current user not found in the database.");
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  console.log("Current User ID:", currentUser._id);

  return currentUser._id; // Return user ID from token
}

async function findUserById(userId) {
  const user = await User.findById(userId);
  console.log("User found:", user); // Log the user object
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function findFriendById(friendId) {
  const friend = await User.findById(friendId);
  console.log("Friend found:", friend); // Log the friend object
  if (!friend) {
    throw new Error("Target user not found");
  }
  return friend;
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const userId = await getUserFromToken(req);
    const body = await req.json(); // Parse the request body
    console.log("Request body:", body); // Log the request body

    const { friendId } = body; // Destructure friendId from the body

    if (!friendId) {
      return new NextResponse("Target user ID is required", { status: 400 });
    }

    const user = await findUserById(userId);
    const friend = await findFriendById(friendId);

    user.blockedUsers = user.blockedUsers.filter((id) => id !== friendId);
    await user.save();

    return new NextResponse("Target user unblocked successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error unblocking target user:", error.message);
    return new NextResponse("Error unblocking target user", { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
