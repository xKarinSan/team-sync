"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
import { useRouter } from "next/navigation";
// ==========================import state management==========================
import useUser from "@/store/userStore";
// ==========================import chakraui components==========================
import { Heading } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import LoadingDisplay from "@/components/general/LoadingDisplay";
import MainMenu from "@/components/general/MainMenu";
import { getTeamByTeamId } from "@/requests/teams/GETRequests";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { MenuOption } from "@/types/HomePage/menuOptions";
// ==========================etc==========================
import DocumentsImage from "../../../images/teampage/DocumentsImage.png";
import CalendarImage from "../../../images/teampage/CalendarImage.png";
import MeetingImage from "../../../images/teampage/MeetingImage.png";
import ChatImage from "../../../images/teampage/ChatImage.png";
import MembersImage from "../../../images/teampage/MembersImage.png";

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamHomePage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    const { user } = useUser();
    const router = useRouter();
    const menuOptions: MenuOption[] = [
        {
            label: "Documents",
            icon: DocumentsImage,
            path: `/team/${params.teamId}/documents`,
        },
        {
            label: "Calendar",
            icon: CalendarImage,
            path: `/team/${params.teamId}/calendar`,
        },
        {
            label: "Meeting",
            icon: MeetingImage,
            path: `/team/${params.teamId}/meetings`,
        },
        {
            label: "Chat",
            icon: ChatImage,
            path: `/team/${params.teamId}/chat`,
        },
        {
            label: "Members",
            icon: MembersImage,
            path: `/team/${params.teamId}/members`,
        },
    ];

    // ===============states===============
    const [loading, setLoading] = useState<boolean>(false);
    const [currTeam, setCurrTeam] = useState(null);

    // ===============helper functions (will not be directly triggered)===============
    const retrieveCurrentTeam = async () => {
        const selectedTeam = await getTeamByTeamId(params.teamId);
        if (selectedTeam) {
            setCurrTeam(selectedTeam);
        }
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        userLoginProtection(user, router);
        retrieveCurrentTeam();
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <LoadingDisplay displayText="Retrieving team info . . ." />
                </>
            ) : (
                <>
                    {" "}
                    <Heading textAlign={"center"} fontWeight={"normal"}>
                        {currTeam ? currTeam.teamName : "Team Name"}
                    </Heading>
                    <MainMenu menuOptions={menuOptions} />
                </>
            )}
            {/* {params.teamId} */}
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
