import {
    onValue,
    set,
    remove,
    onDisconnect,
    update,
    get,
} from "firebase/database";
import {
    getConferenceRef,
    getConferenceParticipantRef,
    getConferenceParticipantUserRef,
} from "./conferenceRefs";
import { createNewMeeting } from "../meetings/meetingAdd";
import { Meeting } from "@/types/MeetingRecords/meetingTypes";

// ==================== retrieve conference ====================
export const getTeamConference = async (teamId: string) => {
    const confRef = getConferenceRef(teamId);
    const currConferenceSnapshot = await get(confRef);
    if (currConferenceSnapshot.exists()) {
        return currConferenceSnapshot.val();
    }
    return null;
};

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

// ==================== change host ====================
export const changeHost = async (teamId: string) => {
    const conferenceRef = getConferenceRef(teamId);
    await update(conferenceRef, {
        host: "",
    });
};

// ==================== leave conference ====================
export const leaveConference = async (teamId: string, userId: string) => {
    try {
        const currentConference = await getTeamConference(teamId);
        if (currentConference) {
            const { lastStarted, host } = currentConference;
            const newMeeting: Meeting = {
                teamId,
                startDate: lastStarted,
                endDate: Date.now(),
            };
            if (userId === host) {
                // Update the host to an empty string before creating a new meeting
                await changeHost(teamId);

                const newMeetingPromise = createNewMeeting(newMeeting);
                const currentParticipantRef =
                    getConferenceParticipantRef(teamId);
                const removeMeetingPromise = remove(currentParticipantRef);

                await Promise.all([newMeetingPromise, removeMeetingPromise]);
                window.close();
            } else {
                const currentParticipantRef = getConferenceParticipantUserRef(
                    teamId,
                    userId
                );
                await remove(currentParticipantRef);
            }
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

// ==================== update preferences ====================
export const updatePreferences = async (
    teamId: string,
    userId: string,
    preferences: any
) => {
    const currentParticipantRef = getConferenceParticipantUserRef(
        teamId,
        userId
    );
    await update(currentParticipantRef, preferences);
};

// ==================== realtime listener ====================
export const realtimeMeetingListener = (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string,
    setCurrentData: (data: any) => void,
    setCurrentUser: (data: any) => void
) => {
    const conferenceRef = getConferenceRef(teamId);
    onValue(conferenceRef, async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const { host, lastStarted } = data;

            const currParticipants: any = [];
            if (data.hasOwnProperty("participants")) {
                if (!Object.keys(data.participants).includes(host)) {
                    // Host has left, handle this situation as needed.
                    await leaveConference(teamId, userId);
                    return;
                }
                let participantIds = Object.keys(data.participants);
                participantIds.forEach((id: string) => {
                    if (id == userId) {
                        const { videoEnabled, micEnabled, screenShareEnabled } =
                            data.participants[id];
                        setCurrentUser({
                            videoEnabled,
                            micEnabled,
                            screenShareEnabled,
                        });
                    }
                    currParticipants.push({ ...data.participants[id], id });
                });
            }
            const currentConference = {
                host,
                lastStarted,
                participants: currParticipants,
            };
            setCurrentData(currentConference);

            if (!data.hasOwnProperty("participants") || host === "") {
                await conferenceInit(teamId, userId, userName, profilePic);
            } else {
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
