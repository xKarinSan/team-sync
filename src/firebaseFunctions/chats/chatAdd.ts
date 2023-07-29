import { getChatRef, getChatMessagesRef } from "./chatRefs";
import { update, push } from "firebase/database";
import { Chat, ChatMessage } from "@/types/Chat/chatTypes";

// ================== simple modular functions ==================
export const createNewChat = async (teamId: string, newChat: Chat) => {
    try {
        const res = await update(getChatRef(teamId), newChat);
        return null;
    } catch (e) {
        return null;
    }
};

export const sendNewMessage = async (
    teamId: string,
    userId: string,
    content: string
) => {
    try {
        const newMessage: ChatMessage = {
            senderId: userId,
            content,
            sentDate: Date.now(),
        };
        const messageSent = await push(getChatMessagesRef(teamId), newMessage);
        if (messageSent) {
            return messageSent.key;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
};
