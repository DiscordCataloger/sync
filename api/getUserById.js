export async function getUserById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-store",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.log("Error loading user: ", error);
  }
}
