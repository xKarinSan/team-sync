export interface Chat {
    // this will be defaults
    chatName: string;
    messages: { [key: string]: ChatMessage };
    participants: { [key: string]: ChatParticipant };
}

export interface ChatMessage {
    // this will be defaults
    senderId: string;
    content: string;
    sentDate: any;
}
export interface ChatMessageWithId extends ChatMessage {
    id: string;
}

export type ChatParticipant = {
    username: string;
    profilePic: string;
};
