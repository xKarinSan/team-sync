import { NextRequest, NextResponse } from "next/server";
import { getTeamById } from "@/firebaseFunctions/teams/teamGet";

export async function GET(req: NextRequest, { params }) {
    try {
        const { teamId } = params;
        // get teamId
        const currTeam = await getTeamById(teamId);
        // console.log("currTeam",currTeam)
        if (currTeam) {
            return NextResponse.json(currTeam);
        } else {
            return NextResponse.json(null);
        }
    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
