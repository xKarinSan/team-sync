"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import React, { useEffect, useState, useRef } from "react";
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
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
// ==========================import custom components==========================
import CustomButton from "@/components/custom/CustomButton";
import CustomContainer from "@/components/custom/CustomContainer";
import CustomGrid from "@/components/custom/CustomGrid";
// ==========================import external functions==========================
import { realtimeMeetingListener } from "@/firebaseFunctions/conferences/conferenceGet";
import {
    leaveConference,
    removeScreenSharer,
} from "@/firebaseFunctions/conferences/conferenceDelete";
import {
    updatePreferences,
    setScreenSharer,
} from "@/firebaseFunctions/conferences/conferenceUpdate";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { Conference } from "@/types/MeetingRecords/realtimeMeeting";
// ==========================etc==========================
import AgoraRTC from "agora-rtc-sdk-ng";
import { rtc, options } from "@/config/agoraConfig";
import DefaultProfilePic from "@/images/general/defaultProfilePic.png";
import { UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";
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
    const participantRef = useRef<any>(null);

    // ===============states===============
    const [currentMeeting, setCurrentMeeting] = useState<Conference>({
        // participants: [],
        participants: {},
        isActive: false,
        lastStarted: null,
        host: "",
        screenSharer: null,
    }); // [{id: string, name: string, video: boolean, audio: boolean}

    const [userSettings, setUserSettings] = useState<any>({
        videoEnabled: false,
        micEnabled: false,
        screenShareEnabled: false,
    });

    const [remoteUsers, setRemoteUsers] = useState<any>({});

    // ===============helper functions (will not be directly triggered)===============
    const initAgoraClient = async () => {
        // const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
        if (rtc.client) {
            return;
        }
        rtc.client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "h264",
        });

        setRemoteUsers(rtc.client.remoteUsers);
        rtc.client.remoteUsers.forEach((user: any) => {
            if (user.audioTrack) {
                user.audioTrack.play();
            }
            if (user.videoTrack) {
                user.videoTrack.play(`player-${user.uid}`);
            }
        });
        // event handling
        rtc.client.on("user-published", async (user: any, mediaType: any) => {
            await subscribe(user, mediaType);
        });
        rtc.client.on("user-unpublished", async (user: any) => {
            await handleUserLeft(user);
        });
        await rtc.client.join(options.appId, teamId, null, userId);
        // Create an audio track from the audio captured by a microphone
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

        rtc.localAudioTrack.play();
        // Create a video track from the video captured by a camera
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        rtc.localVideoTrack.play("local-stream");

        const { localAudioTrack, localVideoTrack } = rtc;

        await rtc.client.publish([localAudioTrack, localVideoTrack]);
    };

    const subscribe = async (user: any, mediaType: any) => {
        const id = user.uid;
        const currentRemoteUsers = remoteUsers;
        currentRemoteUsers[id] = user;
        setRemoteUsers(currentRemoteUsers);
        const uid = user.uid;
        await rtc.client.subscribe(user, mediaType);
        if (mediaType === "video") {
            user.videoTrack.play(`player-${uid}`);
        }
        if (mediaType === "audio") {
            user.audioTrack.play();
        }
    };

    // Handle user leave
    const handleUserLeft = (user: any) => {
        const id = user.uid;
        delete remoteUsers[id];
    };

    // =========mic=========
    const muteAudio = async () => {
        await rtc.localAudioTrack.setEnabled(false);
    };

    const unmuteAudio = async () => {
        await rtc.localAudioTrack.setEnabled(true);
    };

    // =========webcam=========
    const muteVideo = async () => {
        await rtc.localVideoTrack.setEnabled(false);
    };

    const unmuteVideo = async () => {
        await rtc.localVideoTrack.setEnabled(true);
    };

    // =========screen sharing=========
    const startSharing = async () => {
        await setScreenSharer(teamId, userId, username);
        toast({
            title: "Screen sharing started",
            status: "success",
        });
    };
    const stopSharing = async () => {
        await removeScreenSharer(teamId);
        toast({
            title: "Screen sharing stopped",
            status: "success",
        });
    };

    // ===============main functions (will be directly triggered)===============
    const toggleMic = async () => {
        if (userSettings.micEnabled) {
            await muteAudio();
        } else {
            await unmuteAudio();
        }
        await updatePreferences(teamId, userId, {
            micEnabled: !userSettings.micEnabled,
        });
    };
    const toggleCam = async () => {
        if (userSettings.videoEnabled) {
            await muteVideo();
        } else {
            await unmuteVideo();
        }
        await updatePreferences(teamId, userId, {
            videoEnabled: !userSettings.videoEnabled,
        });
    };

    const toggleScreenShare = async () => {
        // if (userSettings.screenShareEnabled) {
        //     await startSharing();
        // } else {
        //     await stopSharing();
        // }

        // ==
        // check if anyone is sharing screen
        // console.log("[toggleScreenShare] currentMeeting", currentMeeting);
        if (currentMeeting.screenSharer) {
            // if someone is sharing screen, check if its you
            const { screenSharer } = currentMeeting;
            // if its you, you can stop sharing
            // alert("screenSharer: " + screenSharer + " userId: " + userId);
            if (screenSharer.userId == userId) {
                await stopSharing();
            }
            // else, you cannot do anything
            else {
                toast({
                    title: "Someone is sharing screen, please wait...",
                    status: "warning",
                });
            }
        }
        // if nobody is sharing screen, you can share screen
        else {
            await startSharing();
        }
    };

    const leaveMeeting = async () => {
        await handleLeave();
        await leaveConference(teamId, userId).then(async () => {
            // await handleLeave();
            toast({
                title: "Left the meeting, going back to teams...",
                status: "info",
            });
            window.close();
        });
    };

    const handleLeave = async () => {
        try {
            await rtc.client.leave();
        } catch (err) {
            console.error(err);
        }
    };

    // ===============useEffect===============
    useEffect(() => {
        initAgoraClient();
        realtimeMeetingListener(
            teamId,
            userId,
            username,
            profilePic,
            setCurrentMeeting,
            setUserSettings
        );
    }, []);

    useEffect(() => {
        if (rtc.client.remoteUsers) {
            rtc.client.remoteUsers.forEach((user: any) => {
                if (user.audioTrack) {
                    user.audioTrack.play();
                }
                if (user.videoTrack) {
                    user.videoTrack.play(`player-${user.uid}`);
                }
            });
        }
    }, [currentMeeting, rtc.client]);
    return (
        <Box>
            {" "}
            <Heading fontWeight={"normal"} size="lg">
                Ongoing Meeting
            </Heading>
            <CustomContainer minHeight="80vh" maxHeight="80vh">
                {currentMeeting.screenSharer ? (
                    <>
                        <SharedScreen
                            sharerId={currentMeeting.screenSharer.userId}
                            sharerName={currentMeeting.screenSharer.username}
                        />
                    </>
                ) : (
                    <></>
                )}
                <Box padding="5px">
                    <CustomGrid
                        gridCols={[1, null, null, null, 2, 3]}
                        ref={participantRef}
                    >
                        <ParticipantScreen
                            containerId={"local-stream"}
                            username={username + " (You)"}
                            profilePic={profilePic}
                            videoEnabled={userSettings.videoEnabled}
                            micEnabled={userSettings.micEnabled}
                            screenShareEnabled={false}
                        />
                        {Object.keys(currentMeeting.participants).map(
                            (uid, index) => {
                                if (uid != userId) {
                                    const {
                                        username,
                                        videoEnabled,
                                        micEnabled,
                                        screenShareEnabled,
                                        profilePic,
                                    } = currentMeeting.participants[uid];
                                    return (
                                        <ParticipantScreen
                                            key={index}
                                            containerId={`player-${uid}`}
                                            username={username}
                                            profilePic={profilePic}
                                            videoEnabled={videoEnabled}
                                            micEnabled={micEnabled}
                                            screenShareEnabled={
                                                screenShareEnabled
                                            }
                                        />
                                    );
                                }
                            }
                        )}
                        {/* </Box> */}
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
                <IconButton
                    icon={
                        currentMeeting.screenSharer?.userId != userId ? (
                            <LuScreenShare />
                        ) : (
                            <LuScreenShareOff />
                        )
                    }
                    aria-label="toggle-screen-share"
                    margin="5px"
                    onClick={() => {
                        toggleScreenShare();
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
    containerId,
    username,
    profilePic,
    videoEnabled,
    micEnabled,
    screenShareEnabled,
}: {
    containerId?: string;
    username: string;
    profilePic: string;
    videoEnabled: boolean;
    micEnabled: boolean;
    screenShareEnabled: boolean;
}) => {
    return (
        <CustomContainer
            containerColor="#282828"
            minHeight="300px"
            display="grid"
            margin="5px auto"
        >
            <Box margin="10px auto" alignSelf="center" width="100%">
                <Box
                    position="relative"
                    height={
                        videoEnabled
                            ? ["400px", "300px", "200px", "300px"]
                            : "auto"
                    }
                    margin={"0 autp"}
                >
                    {videoEnabled ? null : (
                        <>
                            <Image
                                src={
                                    profilePic
                                        ? profilePic
                                        : DefaultProfilePic.src
                                }
                                referrerPolicy="no-referrer"
                                height={["80px", null, "100px", "120px"]}
                                width={["80px", null, "100px", "120px"]}
                                borderRadius="50%"
                                margin={"0 auto"}
                            />
                        </>
                    )}
                    <Box
                        id={containerId ? containerId : "local-stream"}
                        height="100%"
                        width="100%"
                    ></Box>
                </Box>
            </Box>
            <Text textAlign="center" color="white">
                {username}
            </Text>
            <Box margin="10px auto" alignSelf="center">
                <Icon
                    as={micEnabled ? FiMic : FiMicOff}
                    color="white"
                    margin="10px"
                />
                <Icon
                    as={videoEnabled ? FiVideo : FiVideoOff}
                    color="white"
                    margin="10px"
                />
            </Box>
        </CustomContainer>
    );
};

const SharedScreen = ({
    sharerId,
    sharerName,
}: {
    sharerId: string;
    sharerName: string;
}) => {
    return (
        <Box>
            <Text>{sharerName} is sharing screen</Text>
        </Box>
    );
};
