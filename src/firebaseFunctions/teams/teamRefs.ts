import { realtimeDB } from "../../config/firebaseConfig";
import { ref } from "firebase/database";

export const teamRef = ref(realtimeDB, "teams/");

export const teamRefWithId = (teamId: string) => {
    return ref(realtimeDB, `teams/${teamId}`);
};
