export interface Chat {
    // this will be defaults
    chatName: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    // this will be defaults
    senderId: string;
    content: string;
    sentDate: any;
}
