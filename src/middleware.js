// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const apiKey = req.headers.get("x-api-key");
  console.log("API Key:", apiKey); // Log to verify
  console.log("API Key from Environment:", process.env.NEXT_PUBLIC_API_KEY); // Log to verify

  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return new Response(
      JSON.stringify({ message: "Forbidden: Invalid API Key" }),
      { status: 403 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/servers/:path*",
    "/api/serverChannels/:path*",
    "/api/users/:path*",
  ],
};
