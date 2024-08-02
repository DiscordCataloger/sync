export async function addServerChannelMsg(id, msg) {
  try {
    const res = await fetch(`http://localhost:3000/api/serverChannels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newMessage: msg }),
    });

    if (!res.ok) {
      throw new Error("Failed to add message to server channel");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error adding message to server channel: ", error);
  }
}
