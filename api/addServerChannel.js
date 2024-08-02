export async function addServerChannel(name) {
  try {
    const res = await fetch(`http://localhost:3000/api/serverChannels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelName: name, channelMsgs: [] }),
    });

    if (!res.ok) {
      throw new Error("Failed to add server channel");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error adding server channel: ", error);
  }
}
