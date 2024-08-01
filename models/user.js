import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    onlineStatus: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    notification: {
      type: Array,
    },
    joinedServerList: {
      type: Array,
    },
    allFriends: {
      type: Array,
    },
    pendingFriends: {
      type: Array,
    },
    blockedUsers: {
      type: Array,
    },
    messages: {
      type: Array,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
