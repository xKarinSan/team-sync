import { membershipRef } from "./membershipRefs";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { getSnapshotData } from "../general/getSnapshotData";
import { Membership } from "@/types/Membership/membertypes";
import { getAllUsers } from "../users/usersGet";

// Fetch all users
// Call the function to retrieve all users
export const getAllTeamMembers = async (teamId: string) => {
    const dataSnapshot = await get(
        query(membershipRef, orderByChild("teamId"), equalTo(teamId))
    );
    const teamMembers = getSnapshotData(dataSnapshot);
    let userIdDict = {};
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
};
export const memmberInTeam = async (teamId: string, userId: string) => {
    try {
        const dataSnapshot = await get(
            query(membershipRef, orderByChild("userId"), equalTo(userId))
        );
        const results = getSnapshotData(dataSnapshot);
        console.log("results", results);
        if (results && results.length > 0) {
            for (let i: number = 0; i < results.length; i++) {
                if (results[i].teamId === teamId) {
                    console.log("found");
                    return true;
                }
            }
        }
        return false;
    } catch (e) {
        console.log("e", e);
        return false;
    }
};
