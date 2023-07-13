import { NextRequest, NextResponse } from "next/server";
import { allUsers } from "../../firebaseFunctions/users/usersGet";
import { addUser } from "../../firebaseFunctions/users/usersAdd";
export async function GET(req: Request) {
    console.log("Called");
    const data = await allUsers();
    return NextResponse.json({
        message: "OK",
        data,
    });
}

export async function POST(req: NextRequest) {
    // const data = await req.json();
    // console.log("name", data);
    const { name } = await req.json();
    const addUserReq = await addUser(name);
    if (addUserReq) {
        return NextResponse.json({ message: "Added" });
    } else {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
