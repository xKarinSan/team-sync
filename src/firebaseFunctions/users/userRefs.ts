import { realtimeDB } from "@/config/firebaseConfig";
import { ref } from "firebase/database";

export const userRef = ref(realtimeDB, "users/");
export const userRefById = (userId: string) => {
    return ref(realtimeDB, `users/${userId}`);
};
