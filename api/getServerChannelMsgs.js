export async function getServerChannelMsgs(id, offset = 0, limit = 20) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/serverChannels/${id}/msgs?offset=${offset}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch server channel messages");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading server channel messages: ", error);
  }
}
