import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import server from "../../../../../../libs/mongodb/server";
import User from "../../../../../../models/user";
import bcrypt from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";

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
          console.log(error);
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
      scope: "email", // Add the 'email' scope here
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
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    newUser: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signIn callback triggered"); // Initial log
      if (account.provider === "google") {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile.email,
              displayName: profile.name,
              icon: profile.picture,
            }),
          });
          if (res.ok) {
            return true;
          } else {
            console.error("Failed to register user");
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      if (account.provider === "facebook") {
        try {
          // Assuming 'profile.picture.data' is the object you receive from Facebook
          const profilePictureData = profile.picture.data; // This should be the object containing the URL

          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile.email,
              displayName: profile.name,
              icon: profilePictureData.url,
            }),
          });
          if (res.ok) {
            return true;
          } else {
            console.error("Failed to register user");
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      if (account.provider === "github") {
        console.log(profile.login);
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email:
                profile.email || `${profile.login}@users.noreply.github.com`, // Fallback to a generated email if not provided,
              displayName: profile.name || profile.login,
              icon: profile.avatar_url,
            }),
          });
          if (res.ok) {
            return true;
          } else {
            console.error("Failed to register user");
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = (req, res) => NextAuth(req, res, options);

export { handler as GET, handler as POST };
