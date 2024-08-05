export async function deleteServerChannel(id) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/serverChannels?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add server channel");
    }
  } catch (error) {
    console.log("Error adding server channel: ", error);
  }
}
