"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";
// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import {
    Heading,
    Box,
    Text,
    Image,
    Icon,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
// ==========================import custom components==========================

// ==========================import external functions==========================
import {
    realtimeMeetingListener,
    leaveConference,
    updatePreferences,
    // endConference,
} from "@/firebaseFunctions/conferences/conferenceOperations";
import CustomButton from "@/components/custom/CustomButton";
import CustomContainer from "@/components/custom/CustomContainer";
import CustomGrid from "@/components/custom/CustomGrid";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import {
    Conference,
    ParticipantPreferencesRecord,
} from "@/types/MeetingRecords/realtimeMeeting";
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
    const { userId, username, profilePic } = useUser();
    const { teamId } = useTeam();
    const router = useRouter();
    const toast = useToast();
    // ===============states===============
    const [currentMeeting, setCurrentMeeting] = useState<Conference>({
        participants: [],
        isActive: false,
        lastStarted: null,
        host: "",
    }); // [{id: string, name: string, video: boolean, audio: boolean}

    const [userSettings, setUserSettings] = useState<any>({
        videoEnabled: false,
        micEnabled: false,
        screenShareEnabled: false,
    });

    const [loading, setLoading] = useState(false);
    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const toggleMic = async () => {
        await updatePreferences(teamId, userId, {
            micEnabled: !userSettings.micEnabled,
        });
    };
    const toggleCam = async () => {
        await updatePreferences(teamId, userId, {
            videoEnabled: !userSettings.videoEnabled,
        });
    };
    const leaveMeeting = async () => {
        const left = await leaveConference(teamId, userId).then(() => {
            toast({
                title: "Left the meeting, going back to teams...",
                status: "info",
            });
            window.close();
        });
    };

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        realtimeMeetingListener(
            teamId,
            userId,
            username,
            profilePic,
            setCurrentMeeting,
            setUserSettings
        );
        // configureUserSettings();
        setLoading(false);
    }, []);
    return (
        <Box>
            {" "}
            <Heading fontWeight={"normal"} size="lg">
                Ongoing Meeting
            </Heading>
            <CustomContainer>
                <Box padding="5px">
                    <CustomGrid gridCols={[1, null, null, null, 2]}>
                        {/* participants */}
                        <Box
                            height={["40vh", null, null, null, "80vh"]}
                            overflow="scroll"
                        >
                            {currentMeeting.participants.map(
                                (participant, index) => {
                                    return (
                                        <ParticipantScreen
                                            participant={participant}
                                            key={index}
                                        />
                                    );
                                }
                            )}
                        </Box>
                        <Box height={["40vh", null, null, null, "80vh"]}>
                            <CustomContainer
                                containerColor="black"
                                minHeight="100%"
                            >
                                IDK
                            </CustomContainer>
                        </Box>
                    </CustomGrid>
                </Box>
            </CustomContainer>
            <CustomContainer>
                <IconButton
                    icon={userSettings.micEnabled ? <FiMic /> : <FiMicOff />}
                    aria-label="toggle-mic"
                    margin="5px"
                    onClick={() => {
                        toggleMic();
                    }}
                />
                <IconButton
                    icon={
                        userSettings.videoEnabled ? <FiVideo /> : <FiVideoOff />
                    }
                    aria-label="toggle-mic"
                    margin="5px"
                    onClick={() => {
                        toggleCam();
                    }}
                />
                <CustomButton
                    clickFunction={leaveMeeting}
                    buttonText={"Leave Meeting"}
                    buttonColor="#AA0000"
                />
            </CustomContainer>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
const ParticipantScreen = ({
    participant,
}: {
    participant: ParticipantPreferencesRecord;
}) => {
    const {
        username,
        profilePic,
        videoEnabled,
        micEnabled,
        screenShareEnabled,
    } = participant;

    return (
        <CustomContainer
            containerColor="#282828"
            minHeight="300px"
            display="grid"
            margin="5px auto"
        >
            <Box margin="10px auto" alignSelf={"center"} maxHeight={"500px"}>
                {/* <CustomContainer> */}
                <Image
                    src={profilePic}
                    borderRadius={"50%"}
                    margin="10px auto"
                />
                <Text textAlign={"center"} color="white">
                    {username}
                </Text>
                {/* </CustomContainer> */}
            </Box>
            <Box margin="10px auto" alignSelf={"center"}>
                <Icon
                    as={micEnabled ? FiMic : FiMicOff}
                    // as={FiMic}
                    color="white"
                    margin="10px"
                />
                <Icon
                    as={videoEnabled ? FiVideo : FiVideoOff}
                    // as={FiVideo}
                    color="white"
                    margin="10px"
                />
            </Box>
        </CustomContainer>
    );
};
