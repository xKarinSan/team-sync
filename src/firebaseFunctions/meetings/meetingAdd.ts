import { getMeetingRef } from "./meetingRefs";
import { push } from "firebase/database";
import { Meeting } from "@/types/MeetingRecords/meetingTypes";

// ================== simple modular functions ==================
export const createNewMeeting = async (teamId: string, newMeeting: Meeting) => {
    try {
        const res = await push(getMeetingRef(teamId), newMeeting);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};
