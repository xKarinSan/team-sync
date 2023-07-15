import { teamRef } from "./teamRefs";
import { addMembership } from "../memberships/membershipAdd";
import { TeamInput } from "@/types/Team/teamtypes";
import { push } from "firebase/database";

// ================== simple modular functions ==================
export const addTeam = async (newTeam: TeamInput) => {
    try {
        const res = await push(teamRef, {
            ...newTeam,
            createdDate: Date.now(),
        });
        if (res) {
            // console.log("key", res.key);
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};

// ================== complex functions ==================
export const createNewTeam = async (newTeam: TeamInput) => {
    const { userId } = newTeam;
    const newTeamId = await addTeam(newTeam);
    if (newTeamId) {
        const newMembership = await addMembership({
            teamId: newTeamId,
            userId,
            joinedDate: new Date(),
        });
        return newMembership.key;
    } else {
        return null;
    }
};
