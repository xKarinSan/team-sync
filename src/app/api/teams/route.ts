import { NextRequest, NextResponse } from "next/server";
import { addTeam } from "@/firebaseFunctions/teams/teamAdd";
import { getAllTeams } from "@/firebaseFunctions/teams/teamGet";
import { addMembership } from "@/firebaseFunctions/memberships/membershipAdd";
export async function POST(req: NextRequest) {
    const { userId, teamName, createdDate } = await req.json();
    // console.log("team", { userId, teamName, createdDate });
    // return NextResponse.json({ userId, teamName, createdDate });
    // return keyId
    const keyId = await addTeam({
        userId,
        teamName,
        createdDate,
    });
    if (keyId) {
        const res = await addMembership({
            teamId: keyId,
            userId,
            joinedDate: createdDate,
        });
        if (res) {
            return NextResponse.json({ message: "Added" }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    const data = await getAllTeams();
    return NextResponse.json(data);
}
