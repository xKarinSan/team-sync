import {
    getChatRef,
    getChatParticipantRef,
    getChatParticipantUserRef,
} from "./chatRefs";
import {
    Chat,
    // ChatMessageWithId,
    ChatMessage,
    ChatParticipant,
} from "@/types/Chat/chatTypes";
import { onValue, update, onDisconnect } from "firebase/database";
import { createNewChat } from "./chatAdd";

// ================== join chat ==================
export const joinChat = async (
    teamId: string,
    userId: string,
    userName: string,
    profilePic: string
) => {
    const currentParticipantRef = getChatParticipantRef(teamId);
    await update(currentParticipantRef, {
        [userId]: {
            username: userName,
            profilePic,
        },
    });
};

// listen for changes to the chats in the database
export const realtimeTeamChatListener = (
    teamId: string,
    userId: string,
    username: string,
    profilePic: string,
    setCurrentData: (data: any) => void
) => {
    onValue(getChatRef(teamId), async (snapshot) => {
        if (snapshot.exists()) {
            const data: Chat = snapshot.val();
            const { chatName } = data;

            // ========= retrieve messages =========
            let chatMessages: { [key: string]: ChatMessage } = {};
            if (data.messages) {
                const tempMessages = Object.keys(data.messages)
                    .sort(
                        (a: string, b: string) =>
                            data.messages[b].sentDate -
                            data.messages[a].sentDate
                    )
                    .reverse();
                tempMessages.forEach((id: string) => {
                    chatMessages[id] = data.messages[id];
                });
            }

            // ========= retrieve participants =========
            let chatParticipants: { [key: string]: ChatParticipant } = {};
            if (data.participants) {
                Object.keys(data.participants).forEach((id: string) => {
                    chatParticipants[id] = data.participants[id];
                });
            }

            const currentChat = {
                chatName,
                messages: chatMessages,
                participants: chatParticipants,
            };

            setCurrentData(currentChat);

            if (
                (data.participants &&
                    !data.participants.hasOwnProperty(userId)) ||
                !data.participants
            ) {
                await joinChat(teamId, userId, username, profilePic);
            }
        } else {
            // create new chat
            await createNewChat(teamId, {
                chatName: "General Chat",
                messages: {},
                participants: {},
            });
        }
    });
    const disconnectRef = getChatParticipantUserRef(teamId, userId);
    onDisconnect(disconnectRef).remove();
};
