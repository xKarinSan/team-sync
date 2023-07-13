import { TeamInput } from "@/types/Team/teamtypes";
export async function addNewTeam(newTeam: TeamInput) {
    const res = await fetch("/api/teams", {
        method: "POST",
        body: JSON.stringify(newTeam),
    });
    return res.json();
}
