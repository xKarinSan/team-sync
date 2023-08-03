import { onValue, get } from "firebase/database";
import { getAllTeams, getUserTeams } from "../teams/teamGet";
import { getAllUsers } from "../users/usersGet";
import { getAllMemberships } from "../memberships/membershipGet";
import { DeadlineWithTimestamp } from "@/types/Deadline/deadlineTypes";
import { getSnapshotData } from "../general/getSnapshotData";
import { getDeadlineRef, defaultDeadlineRef } from "./deadlineRefs";

// ================== simple modular functions ==================
// Get a deadline by team ID
export const getDeadlineByTeam = async (
    teamId: string
): Promise<DeadlineWithTimestamp[]> => {
    const snapshot = await get(getDeadlineRef(teamId));
    return getSnapshotData(snapshot);
};

// Get all deadlines
export const getAllDeadlines = async (): Promise<DeadlineWithTimestamp[]> => {
    const snapshot = await get(defaultDeadlineRef);
    if (snapshot.exists()) {
        const res: DeadlineWithTimestamp[] = [];

        snapshot.forEach((child) => {
            let currVal = child.val();
            Object.keys(currVal).forEach((key) => {
                res.push({ ...currVal[key], id: key });
            });
        });

        return res;
    }
    return [];
};

// ================== complex functions ==================

// Get user deadlines for a specific team or all teams the user is part of
export const getUserDeadlines = async (
    userId: string
): Promise<DeadlineWithTimestamp[]> => {
    const unfilteredDeadlines = await getAllDeadlines();

    const userMembers = await getUserTeams(userId);
    const idList: string[] = [
        userId,
        ...userMembers.map((member) => member.teamId),
    ];

    const res: DeadlineWithTimestamp[] = unfilteredDeadlines.filter(
        (deadline) => idList.includes(deadline.teamId)
    );

    return res;
};

// Real-time deadline changes
export const realtimeDeadlineChanges = (
    teamId: string,
    // isTeam: boolean,
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

// Get deadlines by specific date and time
export const getDeadlinesByDateTime = async (
    teamId: string,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
): Promise<DeadlineWithTimestamp[]> => {
    const teamDeadlines = await getDeadlineByTeam(teamId);
    const res = teamDeadlines.filter((deadline) => {
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

// Interval can be 30 mins or 1 hr
type EmailRecipient = {
    userId: string;
    username: string;
    individualDeadlines: DeadlineWithTimestamp[];
    teamDeadlines: DeadlineWithTimestamp[];
};

export const retrieveCategorisedUserDeadlines = async (userId: string) => {
    const allTeams = await getAllTeams();
    const teamDict: { [key: string]: string } = {};
    allTeams.forEach((team: any) => {
        const { id, teamName } = team;
        teamDict[id] = teamName;
    });
    const allDeadlines = await getUserDeadlines(userId);
    const returnDeadlines: any = [];
    allDeadlines.forEach((deadline: any) => {
        const { teamId } = deadline;
        if (Object.keys(teamDict).includes(teamId)) {
            returnDeadlines.push({
                ...deadline,
                teamName: "Team " + teamDict[teamId],
            });
        } else {
            returnDeadlines.push({
                ...deadline,
                teamName: "Personal",
            });
        }
    });
    console.log("return deadlines", returnDeadlines);

    return returnDeadlines;
};

// Retrieve all deadlines with specific date and time
export const retrieveAllDeadlinesDateTime = async (
    interval?: number
): Promise<EmailRecipient[]> => {
    try {
        let currentInterval = interval ? interval : 30 * 60 * 1000;
        let recipients: EmailRecipient[] = [];

        let recipientDict: Record<string, EmailRecipient> = {};
        let involvedTeams: Record<string, any> = {};
        let allUsersDict: Record<string, string> = {};
        let allTeamDict: Record<
            string,
            { teamName: string; members: string[] }
        > = {};
        let allDeadlineDict: Record<string, any> = {};

        const existingUsersPromise = await getAllUsers();
        const existingTeamsPromise = await getAllTeams();
        const allDeadlinesPromise = await getAllDeadlines();
        const existingMembershipsPromise = await getAllMemberships();

        const [allUsers, allTeams, allDeadlines, allMemberships] =
            await Promise.all([
                existingUsersPromise,
                existingTeamsPromise,
                allDeadlinesPromise,
                existingMembershipsPromise,
            ]);

        const currDate = new Date();
        const currDateInMs = currDate.getMilliseconds();

        allUsers.forEach((user: any) => {
            allUsersDict[user.userId] = user.username;
        });

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

        Object.keys(involvedTeams).forEach((teamId: string) => {
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
                    recipientDict[userId].individualDeadlines.push(deadline);
                });
            });
        });

        Object.keys(recipientDict).forEach((userId: string) => {
            recipients.push({
                ...recipientDict[userId],
            });
        });

        return recipients;
    } catch (e) {
        console.log(e);
        return [];
    }
};
