import { NextResponse } from 'next/server';
import connectDB from '@/app/(backend)/lib/db';
import Server from '@/app/(backend)/models/serverSchema';

export async function GET(req, { params }) {
    const { id } = params;
    await connectDB();
    const server = await Server.findOne({ _id: id });
    return new Response(JSON.stringify({ server }), { status: 200 });
  }

export async function DELETE(request, { params }) {
    try {
      const deletedServer = await Server.findByIdAndDelete(params.id);
      if (!deletedServer) return NextResponse.json({ message: 'Server not found' }, { status: 404 });
      return NextResponse.json({ message: 'Server deleted' });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }

  export async function PUT(request, { params }) {
    const body = await request.json();
    
    try {
      const updatedServer = await Server.findByIdAndUpdate(params.id, body, { new: true });
      if (!updatedServer) return NextResponse.json({ message: 'Server not found' }, { status: 404 });
      return NextResponse.json(updatedServer);
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }