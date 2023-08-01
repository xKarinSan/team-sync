import {
    onValue,
    onDisconnect,
    get,
    off,
    onChildRemoved,
    query,
} from "firebase/database";
import {
    getConferenceRef,
    getConferenceParticipantUserRef,
} from "./conferenceRefs";
import { conferenceInit,joinConference } from "./conferencePost";
import { leaveConference } from "./conferenceDelete";

// ==================== retrieve conference ====================
export const getTeamConference = async (teamId: string) => {
    const confRef = getConferenceRef(teamId);
    const currConferenceSnapshot = await get(confRef);
    if (currConferenceSnapshot.exists()) {
        return currConferenceSnapshot.val();
    }
    return null;
};


// ==================== realtime listener ====================
export const realtimeMeetingReadOnlyListener = (
    teamId: string,
    setCurrentData: (data: any) => void
) => {
    const conferenceRef = getConferenceRef(teamId);
    onValue(conferenceRef, async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const { host, lastStarted } = data;

            let participantCount = 0;
            if (data.hasOwnProperty("participants")) {
                participantCount = Object.keys(data.participants).length;
            }
            const currentConference = {
                lastStarted,
                participantCount,
            };
            setCurrentData(currentConference);
        }
    });
};

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
            const currParticipants: any = {};

            if (data.hasOwnProperty("participants")) {
                if (!Object.keys(data.participants).includes(host)) {
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
                    currParticipants[id] = { ...data.participants[id] };
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
    const handleOff = () => {
        off(query(getConferenceRef(teamId)));
    };

    const disconnectRef = getConferenceParticipantUserRef(teamId, userId);
    onChildRemoved(disconnectRef, handleOff);
    onDisconnect(disconnectRef).remove();
};
