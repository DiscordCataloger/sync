import User from "models/user"; // Adjust the import path as necessary
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextResponse } from "next/server";

async function connectToDatabase() {
  await mongoose.connect(process.env.MONGODB_URI); // Ensure you have your MongoDB URI set
}

async function getUserFromToken(req) {
  const token = await getToken({ req });
  console.log("Token:", token); // Log the token to inspect its structure
  if (!token || !token.sub) {
    throw new Error("Unauthorized");
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
    throw new Error("Friend not found");
  }
  return friend;
}

async function removeFriend(user, friend, userId, friendId) {
  console.log("User's friends:", user.allFriends); // Log user's friends
  console.log("Friend's friends:", friend.allFriends); // Log friend's friends
  if (
    friend.allFriends.includes(userId) &&
    user.allFriends.includes(friendId)
  ) {
    friend.allFriends = friend.allFriends.filter((id) => id !== userId);
    user.allFriends = user.allFriends.filter((id) => id !== friendId);
    await friend.save();
    await user.save();
  } else {
    throw new Error("Friend already removed!");
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const userId = await getUserFromToken(req);
    const body = await req.json(); // Parse the request body
    console.log("Request body:", body); // Log the request body

    const { friendId } = body; // Destructure friendId from the body

    if (!friendId) {
      return new NextResponse("Friend ID is required", { status: 400 });
    }

    const user = await findUserById(userId);
    const friend = await findFriendById(friendId);

    await removeFriend(user, friend, userId, friendId);

    return new NextResponse("Friend removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error removing friend:", error.message);
    return new NextResponse(error.message || "Error removing friend", {
      status: 500,
    });
  } finally {
    await mongoose.disconnect();
  }
}
