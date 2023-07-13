import { realtimeDB } from "../../config/firebaseConfig";
import { ref } from "firebase/database";

export const membershipRef = ref(realtimeDB, "memberships/");