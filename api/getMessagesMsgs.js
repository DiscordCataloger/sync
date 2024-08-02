export async function getMessagesMsgs(id, offset = 0, limit = 20) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/messages/${id}/msgs?offset=${offset}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch messages msgs");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading messages msgs: ", error);
  }
}
