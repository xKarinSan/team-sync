import { Meeting } from "@/types/MeetingRecords/meetingTypes";
import { getTeamConference } from "./conferenceGet";
import { changeHost } from "./conferenceUpdate";
import { createNewMeeting } from "../meetings/meetingAdd";
import { getConferenceParticipantRef, getConferenceParticipantUserRef, getConferenceRef } from "./conferenceRefs";
import { off, query, remove } from "firebase/database";

// ==================== leave conference ====================
export const leaveConference = async (teamId: string, userId: string) => {
    try {
        const currentConference = await getTeamConference(teamId);
        if (currentConference) {
            const { lastStarted, host } = currentConference;
            const newMeeting: Meeting = {
                startDate: lastStarted,
                endDate: Date.now(),
            };
            if (userId === host) {
                // Update the host to an empty string before creating a new meeting
                await changeHost(teamId);

                const newMeetingPromise = createNewMeeting(teamId, newMeeting);
                const currentParticipantRef =
                    getConferenceParticipantRef(teamId);
                const removeMeetingPromise = remove(currentParticipantRef);

                await Promise.all([newMeetingPromise, removeMeetingPromise]);
                // window.close();
            } else {
                const currentParticipantRef = getConferenceParticipantUserRef(
                    teamId,
                    userId
                );
                await remove(currentParticipantRef);
            }
        }
        // await rtc.client?.leave();
        off(query(getConferenceRef(teamId)));

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
