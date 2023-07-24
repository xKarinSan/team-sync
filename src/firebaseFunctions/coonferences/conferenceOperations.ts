import { onValue, set, remove, onDisconnect, update } from "firebase/database";
import {
    getConferenceRef,
    getConferenceParticipantRef,
    getConferenceParticipantUserRef,
} from "./conferenceRefs";
import {
    Conference,
    ParticipantPreferences,
} from "@/types/MeetingRecords/realtimeMeeting";
// meeting exists? create it
// if the meeting is not ongoing, you start it as the host
// if the meeting is already ongoing, you join it
export const conferenceInit = async (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string
) => {
    // meeting exists? create it
    // if the meeting is not ongoing, you start it as the host
    // if the meeting is already ongoing, you join it
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
        isActive: true,
        lastStarted: Date.now(),
    });
};

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

export const endConference = async (teamId: string, userId: string) => {
    // const currentParticipantRef = getConferenceParticipantRef(teamId);
    // const removeParticipantsPromise = await remove(currentParticipantRef);
    // const currentConferenceRef = getConferenceRef(teamId);
    // const updateMeetingPromise = await update(currentConferenceRef, {
    //     isActive: false,
    // });
    // Promise.all([removeParticipantsPromise, updateMeetingPromise]).then(() => {
    //     alert("Meeting has ended");
    //     window.close();
    // });
    const currentParticipantRef = getConferenceParticipantRef(teamId);
    await remove(currentParticipantRef)
        .then(() => {
            alert("Meeting has ended");
        })
        .then(() => {
            window.close();
        });
};

export const changeHost = async () => {};

export const leaveConference = async (teamId: string, userId: string) => {
    try {
        const currentParticipantRef = getConferenceParticipantUserRef(
            teamId,
            userId
        );
        await remove(currentParticipantRef);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const realtimeMeetingListener = (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string,
    setCurrentData: (data: any) => void
) => {
    const conferenceRef = getConferenceRef(teamId);
    onValue(conferenceRef, async (snapshot) => {
        if (snapshot.exists()) {
            console.log("check");
            const data = snapshot.val();
            const { host, isActive, lastStarted } = data;

            const currParticipants: any = [];
            if (data.hasOwnProperty("participants")) {
                if (!Object.keys(data.participants).includes(host)) {
                    await endConference(teamId, userId);
                    return;
                }
                let participantIds = Object.keys(data.participants);
                participantIds.forEach((id: string) => {
                    currParticipants.push({ ...data.participants[id], id });
                });
            }
            const currentConference = {
                host,
                isActive,
                lastStarted,
                participants: currParticipants,
            };
            setCurrentData(currentConference);

            if (!data.hasOwnProperty("participants") || !data.isActive) {
                await conferenceInit(teamId, userId, userName, profilePic);
            } else {
                console.log(data.participants);
                if (!data.participants.hasOwnProperty(userId)) {
                    await joinConference(teamId, userId, userName, profilePic);
                }
            }
        } else {
            await conferenceInit(teamId, userId, userName, profilePic);
        }
    });
    const disconnectRef = getConferenceParticipantUserRef(teamId, userId);
    onDisconnect(disconnectRef).remove();
};
