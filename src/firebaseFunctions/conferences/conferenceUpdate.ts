import { update } from "firebase/database";
import {
    getConferenceParticipantUserRef,
    getConferenceRef,
    getConferenceScreenSharerRef,
} from "./conferenceRefs";

// ==================== change host ====================
export const changeHost = async (teamId: string) => {
    const conferenceRef = getConferenceRef(teamId);
    await update(conferenceRef, {
        host: "",
    });
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

// ==================== update screen sharer ====================
export const setScreenSharer = async (
    teamId: string,
    userId: string,
    username: string
) => {
    await update(getConferenceScreenSharerRef(teamId), {
        userId,
        username,
    });
};
