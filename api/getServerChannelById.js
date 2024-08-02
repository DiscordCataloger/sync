export async function getServerChannelById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/serverChannels/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch server channels");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading server channels: ", error);
  }
}
