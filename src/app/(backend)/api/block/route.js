import User from "models/user"; // Adjust the import path as necessary
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextResponse } from "next/server";

export async function POST(req) {
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

  const { friendId } = await req.json(); // Only friendId is expected

  if (!friendId) {
    return new NextResponse("Target user ID is required", { status: 400 });
  }

  const userId = currentUser._id; // Use the user ID from the token

  try {
    await mongoose.connect(process.env.MONGODB_URI); // Ensure you have your MongoDB URI set

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return new NextResponse("Target user not found", { status: 404 });
    }

    // Check if the friend request is already pending
    if (user.blockedUsers.includes(friendId)) {
      return new NextResponse("They've already blocked the target user!", {
        status: 400,
      });
    }

    // Remove friend from user's friend lists
    user.pendingFriends = user.pendingFriends.filter((id) => id !== friendId);
    user.allFriends = user.allFriends.filter((id) => id !== friendId);
    friend.pendingFriends = friend.pendingFriends.filter((id) => id !== userId);
    friend.allFriends = friend.allFriends.filter((id) => id !== userId);
    await user.save();
    await friend.save();

    // Add friend to user's blockedUsers
    user.blockedUsers.push(friendId);
    await user.save();

    return new NextResponse("Target user blocked successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error blocking target user:", error.message);
    console.error(error.stack);
    return new NextResponse("Error blocking target user", { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
