"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState, useEffect } from "react";
// ==========================import from next==========================

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Box, Heading, IconButton, Textarea, Text } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "@/components/custom/CustomContainer";
import CustomFormInput from "@/components/custom/CustomFormInput";
import CustomButton from "@/components/custom/CustomButton";
// ==========================import external functions==========================
import { realtimeTeamChatListener } from "@/firebaseFunctions/chats/chatGet";
// ==========================import external variables==========================
import { formatDate } from "@/components/helperFunctions/general/DateFunctions";
// ==========================import types/interfaces==========================
import { Chat, ChatMessage, ChatParticipant } from "@/types/Chat/chatTypes";
// ==========================etc==========================
import { FiSend } from "react-icons/fi";

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function ComponentName({}: {}) {
    // ===============constants===============
    const { userId, username, profilePic } = useUser();
    const { teamId, teamName } = useTeam();

    // ===============states===============
    const [message, setMessage] = useState<string>("");
    // const [teamMessages, setTeamMessages] = useState<any>([]);
    const [teamChat, setTeamChat] = useState<Chat>({
        chatName: "",
        messages: {},
        participants: {},
    });

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const sendMessage = () => {
        alert("sent!");
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
    }, []);

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
                        Team {teamName}'s chat
                    </Heading>
                </CustomContainer>

                <CustomContainer
                    width={["100%"]}
                    minHeight={"70vh"}
                    maxHeight={"70vh"}
                    display={"grid"}
                    marginBottom={0}
                    marginTop={0}
                >
                </CustomContainer>
                <CustomContainer
                    margin="0"
                    width={["100%"]}
                    minHeight={"5vh"}
                    display="flex"
                >
                    <Textarea placeholder="Type your message here ..." />
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
const MessageBubble = ({ originalSender }: { originalSender?: boolean }) => {
    return (
        <Box display="grid" justifyContent={originalSender ? "end" : "start"}>
            <CustomContainer
                width={["fit-content"]}
                // containerColor="white"
                margin="auto"
                marginTop={1}
                marginBottom={1}
                containerColor={originalSender ? "#0239C8" : "white"}
            >
                <Text
                    fontSize={"lg"}
                    color={originalSender ? "white" : "black"}
                >
                    message
                </Text>
                <Text
                    fontSize={"sm"}
                    color={originalSender ? "white" : "black"}
                >
                    Date
                </Text>
            </CustomContainer>
        </Box>
    );
};
