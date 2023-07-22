import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const defaultDeadlineRef = ref(realtimeDB, "deadlines");

export const getDeadlineRef = (teamId?: string) => {
    return ref(realtimeDB, `deadlines/${teamId}`);
};
