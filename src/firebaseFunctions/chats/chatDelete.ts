import { getChatParticipantUserRef, getChatRef } from "./chatRefs";
import { remove, off, query } from "firebase/database";
export const leaveChat = async (teamId: string, userId: string) => {
    try {
        off(query(getChatRef(teamId)));
        const currentUserRef = getChatParticipantUserRef(teamId, userId);
        await remove(currentUserRef);
        return null;
    } catch (e) {
        return null;
    }
};
