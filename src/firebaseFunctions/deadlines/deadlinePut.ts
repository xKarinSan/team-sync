import { getDeadlineRef } from "./deadlineRefs";
import { set } from "firebase/database";
import { DeadlineFormInput } from "@/types/Deadline/deadlineTypes";
export const updateDeadline = async (
    teamId: string,
    deadlineId: string,
    deadline: DeadlineFormInput
) => {
    try {
        const updatedDateTime = Date.now();
        const { year, month, day, hour, minute } = deadline;
        const deadlineDateTime = new Date(
            year,
            month,
            day,
            hour,
            minute
        ).getTime();
        await set(getDeadlineRef(teamId + "/" + deadlineId), {
            ...deadline,
            updatedDateTime,
            deadlineDateTime,
        });
        return true;
    } catch (e) {
        return false;
    }
};
