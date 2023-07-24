import { onValue, set, push, onDisconnect, update } from "firebase/database";
import {
    getConferenceRef,
    getConferenceParticipantRef,
    getConferenceParticipantUserRef,
} from "./conferenceRefs";
import {
    Conference,
    Participant,
} from "@/types/MeetingRecords/realtimeMeeting";
// meeting exists? create it
// if the meeting is not ongoing, you start it as the host
// if the meeting is already ongoing, you join it
export const conferenceInit = async (
    teamId: string,
    userId: string,
    userName: string
) => {
    // meeting exists? create it
    // if the meeting is not ongoing, you start it as the host
    // if the meeting is already ongoing, you join it
    await set(getConferenceRef(teamId), {
        host: userId,
        participants: {
            [userId]: {
                username: userName,
                videoEnabled: true,
                micEnabled: true,
                screenShareEnabled: false,
            },
        },
        isActive: true,
        lastStarted: Date.now(),
    });
};

export const joinConference = async (
    teamId: string,
    userId: string,
    userName: string
) => {
    const currentParticipantRef = getConferenceParticipantRef(teamId);
    await update(currentParticipantRef, {
        [userId]: {
            username: userName,
            videoEnabled: true,
            micEnabled: true,
            screenShareEnabled: false,
        },
    });
};

export const realtimeMeetingListener = (
    teamId: string,
    userId: string,
    userName: string
) => {
    const conferenceRef = getConferenceRef(teamId);
    onValue(conferenceRef, async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (!data.hasOwnProperty("participants") || !data.isActive) {
                await conferenceInit(teamId, userId, userName);
            } else {
                console.log(data.participants);
                if (!data.participants.hasOwnProperty(userId)) {
                    await joinConference(teamId, userId, userName);
                }
            }
        } else {
            await conferenceInit(teamId, userId, userName);
        }
    });
    const disconnectRef = getConferenceParticipantUserRef(teamId, userId);
    onDisconnect(disconnectRef).remove();
};
