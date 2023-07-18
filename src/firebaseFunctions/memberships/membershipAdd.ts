import { membershipRef } from "./membershipRefs";
import { Membership } from "@/types/Membership/membertypes";
import { push } from "firebase/database";
export const addMembership = async (membership: Membership) => {
    try {
        const res = await push(membershipRef, membership);
        if (res) {
            return res.key;
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const massInvite = async (newMemberIds: string[], teamId: string) => {
    try {
        const joinedDate = new Date();
        const promiseList: any[] = [];
        newMemberIds.map(async (userId) => {
            const newMember: Membership = {
                userId,
                teamId,
                joinedDate,
            };
            promiseList.push(await push(membershipRef, newMember));
        });
        const res = await Promise.all(promiseList);
        if (res) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
