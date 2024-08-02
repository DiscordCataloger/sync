import connectMongoDB from "../../../../../libs/mongodb";
import Server from "../../../../../models/server";

// GET request handler
export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const server = await Server.findOne({ _id: id });
  return new Response(JSON.stringify({ server }), { status: 200 });
}

// PUT request handler
export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newServerName: serverName,
    newServerCategory: serverCategory,
    // newServerAdmin: serverAdmin,
    newServerIcon: serverIcon,
    // newServerPrivacy: serverPrivacy,
    newMembers: members,
    newOnlineMembers: onlineMembers,
    newServerChannels: serverChannels,
  } = await req.json();

  await connectMongoDB();
  await Server.findByIdAndUpdate(id, {
    serverName,
    serverCategory,
    // serverAdmin,
    serverIcon,
    // serverPrivacy,
    members,
    onlineMembers,
    serverChannels,
  });

  return new Response(JSON.stringify({ message: "Server Updated" }), {
    status: 200,
  });
}
