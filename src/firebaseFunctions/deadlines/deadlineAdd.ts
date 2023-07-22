import { getDeadlineRef } from "./deadlineRefs";
import { push } from "firebase/database";
import {
    Deadline,
    DeadlineFormInput,
    DeadlineWithTimestamp,
    DeadlineRecord,
} from "@/types/Deadline/deadlineTypes";
// ================== simple modular functions ==================
export const addDeadlineRecord = async (deadlineInput: DeadlineFormInput) => {
    try {
        const { year, month, day, hour, minute, teamId } = deadlineInput;
        const deadlineDateTime = new Date(
            year,
            month,
            day,
            hour,
            minute
        ).getTime();

        const addedDateTime = Date.now();
        const updatedDateTime = addedDateTime;
        
        const res = await push(getDeadlineRef(teamId), {
            ...deadlineInput,
            deadlineDateTime,
            addedDateTime,
            updatedDateTime,
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
