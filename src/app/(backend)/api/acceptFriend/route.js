import User from "models/user"; // Adjust the import path as necessary
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = await getToken({ req }); // Get the token from the request
  console.log("Token:", token); // Log the token to inspect its structure

  if (!token || !token.sub) {
    return new NextResponse("Unauthorized", { status: 401 }); // Return 401 if not authenticated
  }

  const { friendId } = await req.json(); // Only friendId is expected

  if (!friendId) {
    return new NextResponse("Friend ID is required", { status: 400 });
  }

  const userId = token.sub; // Use the user ID from the token

  try {
    await mongoose.connect(process.env.MONGODB_URI); // Ensure you have your MongoDB URI set

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return new NextResponse("Friend not found", { status: 404 });
    }

    // Check if the friend is already your friend
    if (user.allFriends.includes(friendId)) {
      return new NextResponse("This user is already your friend!", {
        status: 400,
      });
    }

    // Add friend ID to user's allFriends list and remove it from pendingFriends list
    if (user.pendingFriends.includes(friendId)) {
      user.pendingFriends = user.pendingFriends.filter((id) => id !== friendId); // Correctly remove the friendId
      user.allFriends.push(friendId);
      friend.allFriends.push(userId);
      await user.save(); // Save the updated user
      await friend.save(); // Save the updated friend object
    } else {
      return new NextResponse("Friend Request already accepted!", {
        status: 400,
      });
    }

    return new NextResponse("Friend request accepted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding friend:", error.message);
    console.error(error.stack);
    return new NextResponse("Error adding friend", { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
