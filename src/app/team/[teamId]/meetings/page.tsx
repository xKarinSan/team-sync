"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
import NextLink from "next/link";
// ==========================import state management==========================
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Heading, Box, useToast } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomButton from "@/components/custom/CustomButton";
import CustomContainer from "@/components/custom/CustomContainer";
// ==========================import external functions==========================
import { realtimeTeamMeetingRecordChanges } from "@/firebaseFunctions/meetings/meetingGet";
import { formatDate } from "@/components/helperFunctions/general/DateFunctions";
import { realtimeMeetingReadOnlyListener } from "@/firebaseFunctions/conferences/conferenceGet";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function MeetingDisplayPage({}: {}) {
    // ===============constants===============
    const toast = useToast();
    const { teamId } = useTeam();

    // ===============states===============
    const [teamMeetings, setTeamMeetings] = useState<any>(null);
    const [currMeeting, setCurrMeeting] = useState<any>({
        lastStarted: null,
        participantCount: 0,
    });

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    // start a meeting if there isnt already an ongoing meeting
    const startMeeting = () => {
        toast({
            title: "Entering meeting ...",
            status: "info",
        });
    };

    // ===============useEffect===============
    useEffect(() => {
        realtimeMeetingReadOnlyListener(teamId, setCurrMeeting);
        realtimeTeamMeetingRecordChanges(teamId, setTeamMeetings);
    }, []);

    // useEffect(() => {
    //     console.log("[useEFfect] currMeeting", currMeeting);
    // }, [currMeeting]);

    return (
        <Box width={["100%", null, "80%", "60%"]}>
            <Heading fontWeight={"normal"} size="lg">
                Meetings
            </Heading>
            <CustomContainer>
                <Heading fontWeight={"normal"} size="md">
                    {currMeeting.participantCount > 0 ? (
                        <>
                            Ongoing since {formatDate(currMeeting.lastStarted)}.{" "}
                            {currMeeting.participantCount}{" "}
                            {currMeeting.participantCount > 1 ? (
                                <>participants are </>
                            ) : (
                                <>participant is </>
                            )}
                            inside.
                        </>
                    ) : (
                        <>There are no meetings occurring currently.</>
                    )}
                </Heading>
                <br />
                <NextLink
                    href={`/team/${teamId}/meetings/current`}
                    target="_blank"
                >
                    <CustomButton
                        buttonText={
                            currMeeting.participantCount > 0
                                ? `Join Meeting`
                                : "Start Meeting"
                        }
                        buttonColor="#0747ED"
                        clickFunction={startMeeting}
                    />
                </NextLink>
            </CustomContainer>

            {teamMeetings ? (
                <>
                    {teamMeetings.map((meeting: any, index: number) => {
                        // const { startDate, endDate, id } = meeting;
                        return (
                            <MeetingRecordContainer
                                key={index}
                                meeting={meeting}
                            />
                        );
                    })}
                </>
            ) : (
                <></>
            )}
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
const MeetingRecordContainer = ({ meeting }: { meeting: any }) => {
    const { startDate, endDate, id } = meeting;
    return (
        <CustomContainer>
            <Heading fontWeight={"normal"} size="lg">
                Team Meeting
            </Heading>
            <br />
            <Heading fontWeight={"normal"} size="sm">
                Started at: {formatDate(startDate)}
            </Heading>
            <Heading fontWeight={"normal"} size="sm">
                Ended at: {formatDate(endDate)}
            </Heading>
        </CustomContainer>
    );
};
