import { getChatRef } from "./chatRefs";
import { update } from "firebase/database";
import { Chat } from "@/types/Chat/chatTypes";

// ================== simple modular functions ==================
export const createNewChat = async (teamId: string, newChat: Chat) => {
    try {
        const res = await update(getChatRef(teamId), newChat);
        return null;
    } catch (e) {
        return null;
    }
};
