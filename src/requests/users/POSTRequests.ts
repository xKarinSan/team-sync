export async function addNewUser(name: string) {
    const res = await fetch("/api", {
        method: "POST",
        body:
         JSON.stringify({
            name,
        }),
    });
    // if (!res.ok) throw new Error("Failed to add user");
    return res.json();
}
