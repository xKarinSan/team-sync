export async function getAllUsers() {
    const res = await fetch("/api", {
        method: "GET",
    });

    if (!res.ok) throw new Error("failed to fetch data");
    return res.json();
}
