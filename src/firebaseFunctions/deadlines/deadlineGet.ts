import {
    DeadlineWithTimestamp,
    DeadlineRecord,
} from "@/types/Deadline/deadlineTypes";
import { getSnapshotData } from "../general/getSnapshotData";
import { getDeadlineRef } from "./deadlineRefs";
import { onValue, get } from "firebase/database";

export const getDeadlineByTeam = async (teamId: string) => {
    const snapshot = await get(getDeadlineRef(teamId));
    return getSnapshotData(snapshot);
};

export const realtimeDeadlineChanges = (
    teamId: string,
    setCurrentData: (data: any) => void
) => {
    const currentDeadlineRef = getDeadlineRef(teamId);
    onValue(currentDeadlineRef, (snapshot) => {
        console.log("trigger onchange");

        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data);
            const res: any[] = [];

            dataIds.forEach((id: string) => {
                res.push({ ...data[id], id });
            });
            console.log("res", res);
            setCurrentData(res);
        }
    });
};

export const getDeadlinesByDateTime = async (
    teamId: string,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
) => {
    const teamDeadlines = await getDeadlineByTeam(teamId);
    const res = teamDeadlines.filter((deadline: DeadlineWithTimestamp) => {
        const {
            year: deadlineYear,
            month: deadlineMonth,
            day: deadlineDay,
            hour: deadlineHour,
            minute: deadlineMinute,
        } = deadline;
        return (
            deadlineYear === year &&
            deadlineMonth === month &&
            deadlineDay === day &&
            deadlineHour === hour &&
            deadlineMinute === minute
        );
    });
    return res;
};
