"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";

// ==========================import from next==========================

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Heading, Box } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================
import { realtimeMeetingListener } from "@/firebaseFunctions/coonferences/conferenceOperations";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CurrentMeeting({
    params,
}: {
    params: {
        teamId: string;
    };
}) {
    // ===============constants===============
    const { userId, username } = useUser();
    const { teamId } = useTeam();
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        realtimeMeetingListener(teamId, userId, username);
    }, []);

    return (
        <>
            {" "}
            <Heading fontWeight={"normal"} size="lg">
                Ongoing Meeting
            </Heading>
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
