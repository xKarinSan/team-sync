import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const getChatRef = (teamId?: string) => {
    return ref(realtimeDB, `chats/${teamId}`);
};

export const getChatParticipantRef = (teamId?: string) => {
    return ref(realtimeDB, `chats/${teamId}/participants`);
};
export const getChatMessagesRef = (teamId?: string) => {
    return ref(realtimeDB, `chats/${teamId}/messages`);
};

export const getChatParticipantUserRef = (teamId?: string, userId?: string) => {
    return ref(realtimeDB, `chats/${teamId}/participants/${userId}`);
};
