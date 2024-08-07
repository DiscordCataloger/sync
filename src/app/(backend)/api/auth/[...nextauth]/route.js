import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import server from "../../../../../../libs/mongodb/server";
import User from "../../../../../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await server();
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            console.log("Password does not match");
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error in authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "email",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/chat",
    signOut: "/",
    error: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Ensure MongoDB connection is established
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 30000, // 30 seconds
          socketTimeoutMS: 45000, // 45 seconds
        });
      }

      const existingUser =
        (await User.findOne({ email: user.email })) ||
        (await User.findOne({ icon: user.icon }));
      if (existingUser) {
        console.log("User already exists:", existingUser.email);
        return true; // User already exists, no need to register
      }

      console.log("signIn callback triggered for provider:", account.provider); // Log provider
      const registerUser = async (data) => {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (res.headers.get("content-type")?.includes("application/json")) {
            const result = await res.json();
            if (res.ok) {
              return true;
            } else {
              console.error("Failed to register user", result);
              return false;
            }
          } else {
            console.error("Unexpected response format");
            return false;
          }
        } catch (error) {
          console.log("Error in registerUser:", error);
          return false;
        }
      };

      if (account.provider === "google") {
        console.log("Google profile:", profile);
        return registerUser({
          email: profile.email,
          displayName: profile.name,
          icon: profile.picture,
        });
      }
      if (account.provider === "facebook") {
        console.log("Facebook profile:", profile);
        const profilePictureData = profile.picture.data; // This should be the object containing the URL
        return registerUser({
          email: profile.email,
          displayName: profile.name,
          icon: profilePictureData.url,
        });
      }
      if (account.provider === "github") {
        console.log("GitHub profile:", profile);
        return registerUser({
          email: profile.email || `${profile.login}@users.noreply.github.com`, // Fallback to a generated email if not provided,
          displayName: profile.name || profile.login,
          icon: profile.avatar_url,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name; // Corrected this line
        token.icon = user.icon;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = (req, res) => {
  console.log("NextAuth handler triggered"); // Log handler trigger
  return NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
