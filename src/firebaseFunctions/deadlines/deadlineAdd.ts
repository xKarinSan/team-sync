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
        console.log("addedDateTime", addedDateTime);
        const updatedDateTime = addedDateTime;
        console.log("deadlineDateTime", deadlineDateTime);

        const newDeadline: DeadlineWithTimestamp = {
            ...deadlineInput,
            deadlineDateTime,
            addedDateTime,
            updatedDateTime,
        };
        console.log("newDeadline", newDeadline);
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
