import { getMeetingRef } from "./meetingRefs";
import { push } from "firebase/database";
import { Meeting, MeetingWithTimestamp } from "@/types/MeetingRecords/meetingTypes";

// ================== simple modular functions ==================
export const createNewMeeting = async (meeting: Meeting) => {
    try {
        const newMeeting: MeetingWithTimestamp = {
            ...meeting,
            startDate: Date.now(),
            endDate: -1,
        };
        const res = await push(getMeetingRef(meeting.teamId), newMeeting);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};
