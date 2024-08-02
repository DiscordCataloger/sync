export async function getMessages() {
  try {
    const res = await fetch("http://localhost:3000/api/messages", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading messages: ", error);
  }
}
