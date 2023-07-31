import { getMeetingRef } from "./meetingRefs";
import { onValue } from "firebase/database";

// listen for changes to the meetings in the database
export const realtimeTeamMeetingRecordChanges = (
    teamId: string,
    setCurrentData: (data: any) => void
) => {
    onValue(getMeetingRef(teamId), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data)
                .sort((a, b) => data[b].createdAt - data[a].createdAt)
                .reverse();
            const res: any[] = [];

            dataIds.forEach((id: string) => {
                res.push({ ...data[id], id });
            });
            setCurrentData(res);
        }
    });
};
