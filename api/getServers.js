export async function getServers() {
  try {
    const res = await fetch("http://localhost:3000/api/servers", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch servers");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading servers: ", error);
  }
}
