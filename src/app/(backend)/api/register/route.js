import server from "../../../../../libs/mongodb/server";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { displayName, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await server();
    await User.create({ displayName, email, password: hashedPassword });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      message: `${err}`,
    });
  }
}
