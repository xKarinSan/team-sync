import { getMeetingRef, meetingRef } from "./meetingRefs";
import { push } from "firebase/database";
import { Meeting } from "@/types/MeetingRecords/meetingTypes";

// ================== simple modular functions ==================
export const createNewMeeting = async (newMeeting: Meeting) => {
    try {
        const res = await push(meetingRef, newMeeting);
        console.log("res",res)
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};
