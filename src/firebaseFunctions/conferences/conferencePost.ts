import { set, update } from "firebase/database";
import {
    getConferenceRef,
    getConferenceParticipantRef,
} from "./conferenceRefs";

// ==================== start conference ====================
export const conferenceInit = async (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string
) => {
    const startDate = Date.now();
    await set(getConferenceRef(teamId), {
        host: userId,
        participants: {
            [userId]: {
                username: userName,
                profilePic,
                videoEnabled: true,
                micEnabled: true,
                screenShareEnabled: false,
            },
        },
        lastStarted: startDate,
    });
};

// ==================== join conference ====================
export const joinConference = async (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string
) => {
    const currentParticipantRef = getConferenceParticipantRef(teamId);
    await update(currentParticipantRef, {
        [userId]: {
            username: userName,
            profilePic,
            videoEnabled: true,
            micEnabled: true,
            screenShareEnabled: false,
        },
    });
};
