import { getDeadlineRef } from "./deadlineRefs";
import { remove } from "firebase/database";

export const deleteDeadlineRecord = async (
    teamId: string,
    deadlineId: string
) => {
    try {
        await remove(getDeadlineRef(teamId + "/" + deadlineId));
        return true;
    } catch (e) {
        return false;
    }
};
