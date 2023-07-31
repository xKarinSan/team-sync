"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState, useEffect, useRef } from "react";
// ==========================import from next==========================

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import {
    Box,
    Heading,
    IconButton,
    Textarea,
    Text,
    useToast,
    Image,
} from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "@/components/custom/CustomContainer";
// ==========================import external functions==========================
import { realtimeMembershipListener } from "@/firebaseFunctions/memberships/membershipGet";
import { realtimeTeamChatListener } from "@/firebaseFunctions/chats/chatGet";
import { sendNewMessage } from "@/firebaseFunctions/chats/chatAdd";
// ==========================import external variables==========================
import { formatDate } from "@/components/helperFunctions/general/DateFunctions";
// ==========================import types/interfaces==========================
import { Chat, ChatMessage, ChatParticipant } from "@/types/Chat/chatTypes";
// ==========================etc==========================
import { FiSend } from "react-icons/fi";
import DefaultProfilePic from "@/images/general/defaultProfilePic.png";

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function ComponentName({}: {}) {
    // ===============constants===============
    const { userId, username, profilePic } = useUser();
    const { teamId, teamName } = useTeam();
    const toast = useToast();
    const bottomRef = useRef<any>();

    // ===============states===============
    const [message, setMessage] = useState<string>("");
    // const [teamMessages, setTeamMessages] = useState<any>([]);
    const [teamChat, setTeamChat] = useState<Chat>({
        chatName: "",
        messages: {},
        participants: {},
    });

    const [currentMembers, setCurrentMembers] = useState<{
        [key: string]: ChatParticipant;
    }>({});

    // ===============helper functions (will not be directly triggered)===============
    const handleScrollToBottom = () => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    };

    const submitByEnter = (keyCode: any) => {
        //it triggers by pressing the enter key
        if (keyCode === 13) {
            sendMessage();
        }
    };

    // ===============main functions (will be directly triggered)===============
    const sendMessage = async () => {
        if (message === "") return;
        const messageSent = await sendNewMessage(teamId, userId, message);
        if (messageSent) {
            toast({
                title: "Message sent",
                position: "top",
                status: "success",
            });
            setMessage("");
            handleScrollToBottom();
        }
    };

    // ===============useEffect===============
    useEffect(() => {
        // listen to any team messages
        realtimeTeamChatListener(
            teamId,
            userId,
            username,
            profilePic,
            setTeamChat
        );
        realtimeMembershipListener(teamId, setCurrentMembers);
        handleScrollToBottom();
    }, []);
    useEffect(() => {
        handleScrollToBottom();
    }, [teamChat]);
    return (
        <Box
            width={["100%", null, "80%", null, "60%"]}
            display={"grid"}
            margin="auto"
        >
            <Box margin="auto" justifyItems={"middle"} width="100%">
                <CustomContainer margin="0" width={["100%"]}>
                    <Heading
                        as="h1"
                        size="lg"
                        fontWeight={"normal"}
                        margin="0 auto"
                    >
                        {teamChat.chatName === "" ? (
                            <> Team {teamName}&apos;s chat</>
                        ) : (
                            <>{teamChat.chatName}</>
                        )}
                    </Heading>
                    <Text fontSize={"sm"} margin="0 auto">
                        {Object.keys(teamChat.participants).length} Online
                    </Text>
                </CustomContainer>

                <CustomContainer
                    width={["100%"]}
                    minHeight={"70vh"}
                    maxHeight={"70vh"}
                    marginBottom={0}
                    marginTop={0}
                >
                    {teamChat.messages &&
                    Object.keys(currentMembers).length > 0 ? (
                        <>
                            {Object.keys(teamChat.messages).map(
                                (messageId: string) => {
                                    const { content, sentDate, senderId } =
                                        teamChat.messages[messageId];
                                    const message: ChatMessage =
                                        teamChat.messages[messageId];
                                    const originalSender: boolean =
                                        message.senderId === userId;
                                    const { username, profilePic } =
                                        currentMembers[senderId];
                                    return (
                                        <MessageBubble
                                            username={username}
                                            profilePic={
                                                profilePic
                                                    ? profilePic
                                                    : DefaultProfilePic.src
                                            }
                                            key={messageId}
                                            content={content}
                                            sentDate={sentDate}
                                            originalSender={originalSender}
                                        />
                                    );
                                }
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                    <div ref={bottomRef}></div>
                </CustomContainer>

                <CustomContainer
                    margin="0"
                    width={["100%"]}
                    minHeight={"5vh"}
                    display="flex"
                >
                    <Textarea
                        placeholder="Type your message here ..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => submitByEnter(e.keyCode)}
                    />
                    <IconButton
                        margin={2}
                        aria-label="Send message"
                        icon={<FiSend />}
                        background={"#0239C8"}
                        color="white"
                        borderRadius={"50%"}
                        onClick={() => {
                            sendMessage();
                        }}
                    />
                </CustomContainer>
            </Box>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
const MessageBubble = ({
    username,
    profilePic,
    originalSender,
    content,
    sentDate,
}: {
    username?: string;
    profilePic?: string;
    originalSender?: boolean;
    content: string;
    sentDate: any;
}) => {
    return (
        <Box display="grid" justifyContent={originalSender ? "end" : "start"}>
            <Box display="flex">
                {profilePic && !originalSender ? (
                    <>
                        {" "}
                        <Image
                            src={profilePic}
                            referrerPolicy="no-referrer"
                            borderRadius="50%"
                            boxSize="40px"
                            margin="10px"
                        />
                    </>
                ) : null}
                <CustomContainer
                    width={["fit-content"]}
                    margin="auto"
                    marginTop={1}
                    marginBottom={1}
                    containerColor={originalSender ? "#0747ED" : "white"}
                >
                    {username && !originalSender ? (
                        <>
                            <Text
                                fontSize={"lg"}
                                color={"#042C94"}
                                fontWeight={"bold"}
                            >
                                {username}
                            </Text>
                        </>
                    ) : null}

                    <Text
                        fontSize={"lg"}
                        color={originalSender ? "white" : "black"}
                    >
                        {content}
                    </Text>
                    <Text
                        fontSize={"xs"}
                        color={originalSender ? "white" : "black"}
                    >
                        {formatDate(sentDate)}
                    </Text>
                </CustomContainer>
            </Box>
        </Box>
    );
};
