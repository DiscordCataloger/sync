import server from "../../../../../libs/mongodb/server";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await server();
  await User.create({ title, description });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET(request) {
  await server();
  const users = await User.find();
  return NextResponse.json({ users });
}
