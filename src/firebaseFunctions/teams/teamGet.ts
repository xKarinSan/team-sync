import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { teamRef, teamRefWithId } from "./teamRefs";
import { membershipRef } from "../memberships/membershipRefs";
import {
    getSnapshotData,
    getIndividualSnapshotData,
} from "../general/getSnapshotData";

// ================== simple modular functions ==================
export const getAllTeams = async () => {
    const dataSnapshot = await get(teamRef);
    return getSnapshotData(dataSnapshot);
};

export const getTeamById = async (teamId: string) => {
    const dataSnapshot = await get(teamRefWithId(teamId));
    return getIndividualSnapshotData(dataSnapshot);
};

export const getTeamByUserId = async (userId: string) => {
    const dataSnapshot = await get(
        query(membershipRef, orderByChild("userId"), equalTo(userId))
    );
    return getSnapshotData(dataSnapshot);
};

// ================== complex modular functions ==================
export const getUserTeams = async (userId: string) => {
    const memberships = await getTeamByUserId(userId);
    const allTeams = await getAllTeams();
    const data = [];
    for (let i = 0; i < memberships.length; i++) {
        const { teamId } = memberships[i];
        const currentTeamInfo = allTeams.filter(
            (currentTeam: any) => currentTeam.id == teamId
        );
        if (currentTeamInfo && currentTeamInfo[0]) {
            const { createdDate, teamName } = currentTeamInfo[0];
            data.push({ createdDate, teamName, teamId });
        }
    }
    return data;
};
