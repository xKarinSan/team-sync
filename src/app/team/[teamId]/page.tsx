"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
// ==========================import state management==========================
// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================
import LoadingDisplay from "@/components/general/LoadingDisplay";
import MainMenu from "@/components/general/MainMenu";
import { getTeamById } from "@/firebaseFunctions/teams/teamGet";
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
    const [currTeam, setCurrTeam] = useState<any>(null);

    // ===============helper functions (will not be directly triggered)===============
    const retrieveCurrentTeam = async () => {
        const selectedTeam = await getTeamById(params.teamId);
        if (selectedTeam) {
            setCurrTeam(selectedTeam);
        }
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
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
                <Box>
                    {" "}
                    <Heading textAlign={"center"} fontWeight={"normal"} m={5}>
                        Welcome to Team {currTeam ? currTeam.teamName : "Team Name"}
                    </Heading>
                    <MainMenu menuOptions={menuOptions} />
                </Box>
            )}
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
