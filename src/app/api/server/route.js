import { NextResponse } from 'next/server';
import connectDB from '../../(backend)/lib/db';
import Server from '../../(backend)/models/serverSchema';


export async function GET() {
    connectDB();
    const servers = await Server.find();
    return new Response(JSON.stringify({servers}),{status:200})
}

export async function POST(request) {
  const body = await request.json();
  const server = new Server(body);
  
  try {
    const savedServer = await server.save();
    return NextResponse.json(savedServer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

// export async function GET_ID(request, { params }) {
//   try {
//     const server = await Server.findById(params.id);
//     if (!server) return NextResponse.json({ message: 'Server not found' }, { status: 404 });
//     return NextResponse.json(server);
//   } catch (err) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }



