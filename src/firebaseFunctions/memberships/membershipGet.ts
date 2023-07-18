import { membershipRef } from "./membershipRefs";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { getSnapshotData } from "../general/getSnapshotData";
import { Membership } from "@/types/Membership/membertypes";
export const memmberInTeam = async (teamId: string, userId: string) => {
    try {
        const dataSnapshot = await get(
            query(
                membershipRef,
                orderByChild("userId"),
                equalTo(userId)
                // orderByChild("teamId"),
                // equalTo(teamId)
            )
        );
        const results = getSnapshotData(dataSnapshot);
        console.log("results", results);
        if (results && results.length > 0) {
            for (let i: number = 0; i < results.length; i++) {
                if (results[i].teamId === teamId) {
                    console.log("found");
                    return true;
                }
            }
        }
        return false;
    } catch (e) {
        console.log("e", e);
        return false;
    }
};
