import { pusher } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req) {
  try {
    const { channelId, selectedServerId, message, triggerType, messageId } =
      await req.json(); // Include triggerType in the destructuring

    if (triggerType === "channel" && channelId) {
      pusher.trigger(
        toPusherKey(`channel:${channelId}:incoming_channel_msgs`),
        "incoming_channel_msgs",
        message
      );
    } else if (triggerType === "server" && selectedServerId) {
      pusher.trigger(
        toPusherKey(`server:${selectedServerId}:incoming_channel_badges`),
        "incoming_channel_badges",
        message
      );
    } else if (triggerType === "dm" && messageId) {
      pusher.trigger(
        toPusherKey(`dm:${messageId}:incoming_dm_msgs`),
        "incoming_dm_msgs",
        message
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in POST /api/triggerPusher:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
