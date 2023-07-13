import { NextRequest, NextResponse } from "next/server";
import {
    getTeamByUserId,
    getAllTeams,
} from "@/firebaseFunctions/teams/teamGet";

export async function GET(req: NextRequest, { params }) {
    try {
        const { userId } = params;
        const userTeams = await getTeamByUserId(userId);
        const allTeams = await getAllTeams();
        const data = [];
        for (let i = 0; i < userTeams.length; i++) {
            const { teamId } = userTeams[i];
            const currentTeamInfo = allTeams.filter(
                (currentTeam: any) => currentTeam.id == teamId
            );
            if (currentTeamInfo) {
                const { createdDate, teamName } = currentTeamInfo[0];
                data.push({ createdDate, teamName, teamId });
            }
        }
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
