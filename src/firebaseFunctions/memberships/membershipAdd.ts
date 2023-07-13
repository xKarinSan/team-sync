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
