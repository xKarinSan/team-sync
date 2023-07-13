"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { Box, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomButton from "@/components/general/CustomButton";
import CustomFormInput from "@/components/general/CustomFormInput";
import CustomModal from "@/components/general/CustomModal";
// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import { addNewTeam } from "@/requests/teams/POSTRequests";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { TeamInput } from "@/types/Team/teamtypes";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamPage() {
    // ===============constants===============
    const router = useRouter();
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // ===============states===============
    const [teamName, setTeamName] = useState<string>("");

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const submitTeam = async () => {
        const { userId } = user;
        const teamObject: TeamInput = {
            userId,
            teamName,
            createdDate: new Date(),
        };
        await addNewTeam(teamObject)
            .then(() => {
                toast({
                    title: "Creation Successful",
                    description: "New team added",
                    status: "success",
                });
                setTeamName("");
            })
            .catch((e) => {
                toast({
                    title: "Creation Unsuccessful",
                    description: "Something went wrong. Please try again later",
                    status: "error",
                });
            });
    };

    // ===============useEffect===============
    useEffect(() => {
        userLoginProtection(user, router);
    });

    return (
        <Box>
            <Heading fontWeight={"normal"}>Teams</Heading>
            <CustomButton
                LeftButtonIcon={FiUser}
                buttonText="Create Team"
                clickFunction={onOpen}
            />
            <WhiteContainer>HELLO</WhiteContainer>
            <WhiteContainer minHeight={"100vh"}>HELLO</WhiteContainer>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                modalTitle="Create Team"
                actionWord={"Create"}
                cancelWord={"Close"}
                modalSubmitFunction={submitTeam}
            >
                <CustomFormInput
                    formId="teamName"
                    placeholder="Enter team name"
                    formLabel="Team Name:"
                    value={teamName}
                    changeHandler={setTeamName}
                />
            </CustomModal>
        </Box>
    );
}
// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
