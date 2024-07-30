import server from "../../../../../libs/mongodb/server";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { displayName, email, password } = await request.json();
    console.log("Received data:", { displayName, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    await server();
    console.log("Connected to the database");

    const newUser = await User.create({
      displayName,
      email,
      password: hashedPassword,
    });
    console.log("User created:", newUser);

    return NextResponse.json(
      { message: "User registration successful!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during registration:", err);
    return NextResponse.json(
      { message: `Error: ${err.message}` },
      { status: 500 }
    );
  }
}
