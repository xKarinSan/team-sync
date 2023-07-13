import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { teamRef } from "./teamRefs";
import { membershipRef } from "../memberships/membershipRefs";
import { getSnapshotData } from "../general/getSnapshotData";
export const getAllTeams = async () => {
    const dataSnapshot = await get(teamRef);
    return getSnapshotData(dataSnapshot);
};

export const getTeamByUserId = async (userId: string) => {
    const dataSnapshot = await get(
        query(membershipRef, orderByChild("userId"), equalTo(userId))
    );
    return getSnapshotData(dataSnapshot);
};
