export async function getAllTeams() {
    const res = await fetch("/api/teams", {
        method: "GET",
    });

    if (!res.ok) throw new Error("failed to fetch data");
    return res.json();
}

export async function getUserTeams(userId: string) {
    const res = await fetch(`/api/teams/${userId}`, {
        method: "GET",
    });

    if (!res.ok) throw new Error("failed to fetch data");
    return res.json();
}

export async function getTeamByTeamId(teamId: string) {
    const res = await fetch(`/api/teams/t/${teamId}`, {
        method: "GET",
    });

    if (!res.ok) throw new Error("failed to fetch data");
    return res.json();
}
