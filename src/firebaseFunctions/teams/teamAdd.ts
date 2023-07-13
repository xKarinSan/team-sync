import { teamRef } from "./teamRefs";
import { TeamInput } from "@/types/Team/teamtypes";
import { push } from "firebase/database";
export const addTeam = async (newTeam: TeamInput) => {
    try {
        const res = await push(teamRef, newTeam);
        if (res) {
            // console.log("key", res.key);
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};
