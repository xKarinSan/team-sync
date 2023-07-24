"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";
// ==========================import from next==========================
import { useRouter } from "next/navigation";
import NextLink from "next/link";
// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Heading, Box, useToast } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomButton from "@/components/custom/CustomButton";
// ==========================import external functions==========================
import { createNewMeeting } from "@/firebaseFunctions/meetings/meetingAdd";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
// import { Meeting } from "@/types/Meetings/meetingTypes";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function MeetingDisplayPage({}: {}) {
    // ===============constants===============
    const router = useRouter();
    const toast = useToast();
    const { userId } = useUser();
    const { teamId } = useTeam();

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    // start a meeting if there isnt already an ongoing meeting
    const startMeeting = () => {
        // const createdNewMeeting = await createNewMeeting({
        //     teamId,
        //     hostId: userId,
        // });
        // if (createdNewMeeting) {
        //     toast({
        //         title: "Meeting created, entering ...",
        //         status: "success",
        //     });
        //     router.push(`/team/${teamId}/meetings/${createdNewMeeting}`);
        // } else {
        //     toast({
        //         title: "Meeting failed to create",
        //         status: "error",
        //     });
        // }
        toast({
            title: "Entering meeting ...",
            status: "info",
        });
        // router.push(`/team/${teamId}/meetings/current`);
    };

    // join a meeting if there is an ongoing meeting
    const joinMeeting = () => {};
    // ===============useEffect===============
    useEffect(() => {}, []);

    return (
        <Box>
            <Heading fontWeight={"normal"} size="lg">
                Meetings
            </Heading>
            <br />
            <NextLink href={`/team/${teamId}/meetings/current`} target="_blank">
                <CustomButton
                    buttonText="Start Meeting"
                    buttonColor="#0747ED"
                    clickFunction={startMeeting}
                />
            </NextLink>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
