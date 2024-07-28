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
      required: true,
    },
    onlineStatus: {
      type: String,
      required: true,
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
    allFrineds: {
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
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
