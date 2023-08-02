import { membershipRef } from "./membershipRefs";
import {
    ref,
    get,
    query,
    orderByChild,
    equalTo,
    onValue,
} from "firebase/database";
import { getSnapshotData } from "../general/getSnapshotData";
import { Membership } from "@/types/Membership/membertypes";
import { getAllUsers, getUserDict } from "../users/usersGet";

// Fetch all memberships
export const getAllMemberships = async () =>{
    try {
        const dataSnapshot = await get(membershipRef);
        const memberships = getSnapshotData(dataSnapshot);
        return memberships;
    } catch (e) {
        console.log(e);
        return [];
    }
}


// Call the function to retrieve all users
export const getAllTeamMembers = async (teamId: string) => {
    try {
        const dataSnapshot = await get(
            query(membershipRef, orderByChild("teamId"), equalTo(teamId))
        );
        const teamMembers = getSnapshotData(dataSnapshot);
        let userIdDict: { [key: string]: string[] } = {};
        const allUsers = await getAllUsers();
        allUsers.forEach((user) => {
            const { userId, username, profilePic } = user;
            userIdDict[userId] = [username, profilePic];
        });
        teamMembers.forEach((teamMember) => {
            const [username, profilePic] = userIdDict[teamMember.userId];
            Object.assign(teamMember, { username, profilePic });
        });
        return teamMembers;
    } catch (e) {
        console.log(e);
        return [];
    }
};
export const memmberInTeam = async (teamId: string, userId: string) => {
    try {
        const dataSnapshot = await get(
            query(membershipRef, orderByChild("userId"), equalTo(userId))
        );
        const results = getSnapshotData(dataSnapshot);
        if (results && results.length > 0) {
            for (let i: number = 0; i < results.length; i++) {
                if (results[i].teamId === teamId) {
                    return true;
                }
            }
        }
        return false;
    } catch (e) {
        return false;
    }
};

export const realtimeMembershipChanges = (
    teamId: string,
    setCurrentData: (data: any) => void
) => {
    onValue(membershipRef, async (snapshot) => {
        const userDict: { [key: string]: string[] } = await getUserDict();
        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data);
            const res: any = [];
            dataIds.forEach((id: string) => {
                if (data[id].teamId === teamId) {
                    const [username, profilePic] = userDict[data[id].userId];
                    res.push({
                        username,
                        profilePic,
                        userId: data[id].userId,
                        id,
                    });
                }
            });
            setCurrentData(res);
        }
    });
};

export const realtimeMembershipListener = (
    teamId: string,
    setCurrentData: (data: any) => void
) => {
    onValue(membershipRef, async (snapshot) => {
        const userDict: { [key: string]: string[] } = await getUserDict();
        if (snapshot.exists()) {
            const data = snapshot.val();
            let dataIds = Object.keys(data);
            const res: any = {};
            dataIds.forEach((id: string) => {
                if (data[id].teamId === teamId) {
                    const [username, profilePic] = userDict[data[id].userId];
                    res[data[id].userId] = {
                        username,
                        profilePic,
                    };
                }
            });
            setCurrentData(res);
        }
    });
};
