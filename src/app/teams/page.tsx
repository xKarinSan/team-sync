"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";

// ==========================import chakraui components==========================
import { Box, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { FiUser, FiUsers } from "react-icons/fi";

// ==========================import custom components==========================
import CustomContainer from "@/components/custom/CustomContainer";
import CustomButton from "@/components/custom/CustomButton";
import CustomFormInput from "@/components/custom/CustomFormInput";
import CustomModal from "@/components/custom/CustomModal";
import LoadingDisplay from "@/components/general/LoadingDisplay";
import NoRecordsDisplay from "@/components/general/NoRecordsDisplay";
import CustomGrid from "@/components/custom/CustomGrid";
// ==========================import external functions==========================
import { createNewTeam } from "@/firebaseFunctions/teams/teamAdd";
import { getUserTeams } from "@/firebaseFunctions/teams/teamGet";
import { getTeamById } from "@/firebaseFunctions/teams/teamGet";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { TeamInput } from "@/types/Team/teamtypes";
import { MembershipDisplay } from "@/types/Membership/membertypes";

// ==========================etc==========================
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamPage() {
    // ===============constants===============
    const router = useRouter();
    const { userId } = useUser();
    const { setTeam } = useTeam();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // ===============states===============
    const [teamName, setTeamName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [memberships, setMemberships] = useState<MembershipDisplay[]>([]);

    // ===============helper functions (will not be directly triggered)===============
    const getMemberships = async () => {
        const userMemberships = await getUserTeams(userId);
        setMemberships(userMemberships);
    };

    // ===============main functions (will be directly triggered)===============
    const submitTeam = async () => {
        if (teamName.length == 0) {
            toast({
                title: "Creation Unsuccessful",
                description: "Team name cannot be empty",
                status: "error",
            });
            return;
        }
        const teamObject: TeamInput = {
            userId,
            teamName,
            createdDate: new Date(),
        };
        await createNewTeam(teamObject)
            .then(() => {
                toast({
                    title: "Creation Successful",
                    description: "New team added",
                    status: "success",
                });
                getMemberships();
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
        setLoading(true);
        getMemberships();
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <LoadingDisplay displayText="Loading contents ..." />
                </>
            ) : (
                <>
                    <Box>
                        <Heading fontWeight={"normal"}>Teams</Heading>
                        <CustomButton
                            LeftButtonIcon={FiUser}
                            buttonText="Create Team"
                            clickFunction={onOpen}
                        />
                        <CustomContainer minHeight={"50vh"}>
                            {memberships.length > 0 ? (
                                <>
                                    {" "}
                                    <CustomGrid>
                                        {memberships.map(
                                            (
                                                membership: MembershipDisplay,
                                                index: number
                                            ) => {
                                                return (
                                                    <MembershipContainer
                                                        membership={membership}
                                                        key={index}
                                                        clickFunction={setTeam}
                                                    />
                                                );
                                            }
                                        )}
                                    </CustomGrid>
                                </>
                            ) : (
                                <>
                                    <NoRecordsDisplay
                                        displayText={
                                            "You are not in any teams."
                                        }
                                    />
                                </>
                            )}
                        </CustomContainer>
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
                </>
            )}
        </>
    );
}
// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
const MembershipContainer = ({
    membership,
    clickFunction,
}: {
    membership: MembershipDisplay;
    clickFunction: (
        teamId: string,
        teamName: string,
        creatorId: string
    ) => void;
}) => {
    const router = useRouter();

    const getCurrentTeam = async () => {
        const currentTeam = await getTeamById(membership.teamId);
        if (currentTeam) {
            const { id, teamName, userId } = currentTeam;
            clickFunction(id, teamName, userId);
            router.push(`/team/${membership.teamId}`);
        }
    };

    return (
        <Box
            onClick={() => {
                //
                getCurrentTeam();
            }}
        >
            <CustomButton
                buttonColor="rgba(243, 246, 251, 1)"
                buttonTextAlignment={"flex-start"}
                textColor="black"
                LeftButtonIcon={FiUsers}
                buttonText={membership.teamName}
                buttonWidth="100%"
            />
        </Box>
    );
};
