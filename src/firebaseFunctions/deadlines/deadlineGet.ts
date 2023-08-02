import { DeadlineWithTimestamp } from "@/types/Deadline/deadlineTypes";
import { getSnapshotData } from "../general/getSnapshotData";
import { getDeadlineRef, defaultDeadlineRef } from "./deadlineRefs";
import { onValue, get } from "firebase/database";
import { getAllTeams, getUserTeams } from "../teams/teamGet";
import { getAllUsers } from "../users/usersGet";
import {
    getAllMemberships,
    getAllTeamMembers,
} from "../memberships/membershipGet";

export const getDeadlineByTeam = async (teamId: string) => {
    const snapshot = await get(getDeadlineRef(teamId));
    return getSnapshotData(snapshot);
};

export const getAllDeadlines = async () => {
    const snapshot = await get(defaultDeadlineRef);
    if (snapshot.exists()) {
        const res: any = [];

        snapshot.forEach((child) => {
            let currVal = child.val();
            Object.keys(currVal).forEach((key) => {
                // console.log("...currVal[key]", currVal[key]);
                res.push({ ...currVal[key], id: key });
            });
        });
        // console.log("res all deadlines", res);
        return res;
    }
    return [];
    // const rawDeadlines = getSnapshotData(snapshot);
    // const res: any[] = [];
    // rawDeadlines.forEach((group) => {
    //     console.log("group",group)
    //     Object.keys(group).forEach((key) => {
    //         res.push(group[key]);
    //     });
    // });
    // console.log(" getAllDeadlines res", res);
    // return res;
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

// interval can be 30 mins or 1 hr
type EmailRecipient = {
    userId: string;
    username: string;
    individualDeadlines: any[];

    // this will display any team name and deadline name and time
    teamDeadlines: any[];
};
export const retrieveAllDeadlinesDateTime = async (interval?: number) => {
    try {
        let currentInterval = interval ? interval : 30 * 60 * 1000;
        // final output
        let recipients: any = [];

        // ==========for involved==========
        // recipients
        let recipientDict: any = {};
        // teams themselves
        let involvedTeams: any = {};

        // ==========for all==========
        // users
        let allUsersDict: any = {};
        // teams
        let allTeamDict: any = {};
        // deadlines
        let allDeadlineDict: any = {};

        // get all the users
        const existingUsersPromise = await getAllUsers();

        // get all the teams
        const existingTeamsPromise = await getAllTeams();

        // get all the deadlines
        const allDeadlinesPromise = await getAllDeadlines();

        // get all the mmebers
        const existingMembershipsPromise = await getAllMemberships();
        Promise.all([
            existingUsersPromise,
            existingTeamsPromise,
            allDeadlinesPromise,
            existingMembershipsPromise,
        ]).then((results) => {
            let [allUsers, allTeams, allDeadlines, allMemberships] = results;

            const currDate = new Date();
            const currDateInMs = currDate.getMilliseconds();

            // =================init the dicts=================
            // based on users
            allUsers.forEach((user: any) => {
                allUsersDict[user.userId] = user.username;
            });
            // based on teams
            allTeams.forEach((team: any) => {
                allTeamDict[team.id] = {
                    teamName: team.teamName,
                    members: [],
                };
            });

            let approachingDeadlines = allDeadlines;

            allMemberships.forEach((membership: any) => {
                const { teamId, userId } = membership;
                allTeamDict[teamId].members.push(userId);
            });

            // loop through the deadline
            approachingDeadlines.forEach((deadline: any) => {
                const { teamId } = deadline;
                if (allUsersDict.hasOwnProperty(teamId)) {
                    recipientDict[teamId] = {
                        userId: teamId,
                        username: allUsersDict[teamId],
                        individualDeadlines: [],
                        teamDeadlines: [],
                    };

                    recipientDict[teamId].teamDeadlines.push(deadline);
                }
                if (allTeamDict.hasOwnProperty(teamId)) {
                    if (!involvedTeams.hasOwnProperty(teamId)) {
                        involvedTeams[teamId] = allTeamDict[teamId];
                    }
                }
            });

            // go through the involved teams
            Object.keys(involvedTeams).forEach((teamId: string) => {
                // get all the members
                const currTeam = involvedTeams[teamId];
                const { members } = currTeam;
                members.forEach((userId: string) => {
                    if (!recipientDict.hasOwnProperty(userId)) {
                        recipientDict[userId] = {
                            userId,
                            username: allUsersDict[userId],
                            individualDeadlines: [],
                            teamDeadlines: [],
                        };
                    }
                    approachingDeadlines.forEach((deadline: any) => {
                        recipientDict[userId].individualDeadlines.push(
                            deadline
                        );
                    });
                });
            });

            Object.keys(recipientDict).forEach((userId: string) => {
                recipients.push({
                    ...recipientDict[userId],
                });
            });
            console.log("recipients", recipients);
            return recipients;
        });
    } catch (e) {
        console.log(e);
        return [];
    }
};
