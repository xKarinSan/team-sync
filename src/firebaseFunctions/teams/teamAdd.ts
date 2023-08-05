import { teamRef } from "./teamRefs";
import { addMembership } from "../memberships/membershipAdd";
import { TeamInput } from "@/types/Team/teamtypes";
import { push } from "firebase/database";
import { addFolder } from "../folders/folderAdd";

// ================== simple modular functions ==================
export const addTeam = async (newTeam: TeamInput) => {
    try {
        const res = await push(teamRef, {
            ...newTeam,
            createdDate: Date.now(),
        });
        if (res) {
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
        const membershipPromise = await addMembership({
            teamId: newTeamId,
            userId,
            joinedDate: Date.now(),
        });
        const teamFolderPromise = await addFolder(newTeamId, {
            folderName: "General",
            createdDate: Date.now(),
            children: [],
            files: [],
        });
        Promise.allSettled([membershipPromise, teamFolderPromise]).then(() => {
            return newTeamId;
        });
        return null;
    } else {
        return null;
    }
};
