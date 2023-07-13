import { realtimeDB } from "../../config/firebaseConfig";
import { ref, push, set } from "firebase/database";
import { TeamInput } from "@/types/Team/teamtypes";
export const addTeam = async (newTeam: TeamInput) => {
    try {
        const teamRef = ref(realtimeDB, "teams/");
        const res = await push(teamRef, newTeam);
        if (res) {
            return true;
        }
        return false;

        // return addUserReq.
    } catch (e) {
        return false;
    }
};
