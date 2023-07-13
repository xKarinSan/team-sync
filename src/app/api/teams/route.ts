import { NextRequest, NextResponse } from "next/server";
import { addTeam } from "@/firebaseFunctions/teams/teamAdd";
export async function POST(req: NextRequest) {
    const { userId, teamName, createdDate } = await req.json();
    // return NextResponse.json({ userId, teamName, createdDate });
    const addUserReq = await addTeam({ userId, teamName, createdDate });
    if (addUserReq) {
        return NextResponse.json({ message: "Added" }, { status: 200 });
    } else {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function GET(req:NextRequest){
    

}