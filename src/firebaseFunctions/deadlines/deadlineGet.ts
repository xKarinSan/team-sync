import { DeadlineWithTimestamp } from "@/types/Deadline/deadlineTypes";
import { getSnapshotData } from "../general/getSnapshotData";
import { getDeadlineRef, defaultDeadlineRef } from "./deadlineRefs";
import { onValue, get } from "firebase/database";
import { getUserTeams } from "../teams/teamGet";

export const getDeadlineByTeam = async (teamId: string) => {
    const snapshot = await get(getDeadlineRef(teamId));
    return getSnapshotData(snapshot);
};

export const getAllDeadlines = async () => {
    const snapshot = await get(defaultDeadlineRef);
    const rawDeadlines = getSnapshotData(snapshot);
    const res: any[] = [];
    rawDeadlines.forEach((group) => {
        Object.keys(group).forEach((key) => {
            res.push({ ...group[key], id: key });
        });
    });
    return res;
};

// unfiltered (did not say which team)
// user + team deadlines
export const getUserDeadlines = async (
    userId: string,
    filteredDeadlines?: any
) => {
    // get from users first
    const unfilteredDeadlines = filteredDeadlines
        ? filteredDeadlines
        : await getAllDeadlines();
    // membership from users
    const userMembers = await getUserTeams(userId);

    // user Id and the teamId of teams useris part of
    const idList: string[] = [];
    idList.push(userId);
    userMembers.forEach((member) => {
        idList.push(member.teamId);
    });

    const res: any[] = [];
    unfilteredDeadlines.forEach((deadline: DeadlineWithTimestamp) => {
        // get the relevant deadlines
        if (idList.includes(deadline.teamId)) {
            res.push(deadline);
        }
    });
    return res;
};

export const realtimeDeadlineChanges = (
    teamId: string,
    isTeam: boolean,
    setCurrentData: (data: any) => void
) => {
    // const currentDeadlineRef = getDeadlineRef(teamId);
    const currentDeadlineRef = defaultDeadlineRef;
    onValue(currentDeadlineRef, async (snapshot) => {
        if (snapshot.exists()) {
            const res = await getUserDeadlines(teamId);
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
