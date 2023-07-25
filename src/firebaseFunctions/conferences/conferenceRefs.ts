import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const getConferenceRef = (teamId?: string) => {
    return ref(realtimeDB, `conferences/${teamId}`);
};

export const getConferenceParticipantRef = (teamId?: string) => {
    return ref(realtimeDB, `conferences/${teamId}/participants`);
};

export const getConferenceParticipantUserRef = (
    teamId: string,
    userId: string
) => {
    return ref(realtimeDB, `conferences/${teamId}/participants/${userId}`);
};
