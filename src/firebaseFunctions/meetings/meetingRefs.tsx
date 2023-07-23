import { realtimeDB } from "../../config/firebaseConfig";
import { ref } from "firebase/database";

export const getMeetingRef = (teamId: string) => {
    return ref(realtimeDB, `meetings/${teamId}`);
};
