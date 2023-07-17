"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";

// ==========================import from next==========================
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";

// ==========================import chakraui components==========================
import {
    Box,
    Heading,
    useDisclosure,
    useToast,
    SimpleGrid,
    Icon,
} from "@chakra-ui/react";
import { FiUser, FiUsers } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomButton from "@/components/general/CustomButton";
import CustomFormInput from "@/components/general/CustomFormInput";
import CustomModal from "@/components/general/CustomModal";
import LoadingDisplay from "@/components/general/LoadingDisplay";
import NoRecordsDisplay from "@/components/general/NoRecordsDisplay";
// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
import { createNewTeam } from "@/firebaseFunctions/teams/teamAdd";
import { getUserTeams } from "@/firebaseFunctions/teams/teamGet";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { TeamInput } from "@/types/Team/teamtypes";
import { MembershipDisplay } from "@/types/Membership/membertypes";

// ==========================etc==========================
import NoResults from "../../images/general/NoResults.png";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamPage() {
    // ===============constants===============
    const router = useRouter();
    const { user } = useUser();
    const { setTeam } = useTeam();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // ===============states===============
    const [teamName, setTeamName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [memberships, setMemberships] = useState<MembershipDisplay[]>([]);

    // ===============helper functions (will not be directly triggered)===============
    const getMemberships = async () => {
        const { userId } = user;
        const userMemberships = await getUserTeams(userId);
        setMemberships(userMemberships);
    };

    // ===============main functions (will be directly triggered)===============
    const submitTeam = async () => {
        const { userId } = user;
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
        userLoginProtection(user, router);
        getMemberships();
        setLoading(false);
    }, []);

    return (
        <Box>
            <Heading fontWeight={"normal"}>Teams</Heading>
            <CustomButton
                LeftButtonIcon={FiUser}
                buttonText="Create Team"
                clickFunction={onOpen}
            />
            <WhiteContainer>HELLO</WhiteContainer>
            {loading ? (
                <>
                    <LoadingDisplay displayText="Loading contents ..." />
                </>
            ) : (
                <>
                    {" "}
                    <WhiteContainer minHeight={"50vh"}>
                        {memberships.length > 0 ? (
                            <>
                                {" "}
                                <SimpleGrid
                                    columns={[2, 3, 4, 5, 6]}
                                    spacing={1}
                                >
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
                                </SimpleGrid>
                            </>
                        ) : (
                            <>
                                <NoRecordsDisplay
                                    displayText={"You are not in any teams."}
                                />
                            </>
                        )}
                    </WhiteContainer>
                </>
            )}

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
const MembershipContainer = ({
    membership,
    clickFunction,
}: // clickFunction,
{
    membership: MembershipDisplay;
    clickFunction: (teamId: string) => void;
}) => {
    const router = useRouter();

    return (
        <NextLink
            href={`/team/${membership.teamId}`}
            onClick={() => {
                clickFunction(membership.teamId);
            }}
            // target="_blank"
        >
            <CustomButton
                buttonColor="rgba(243, 246, 251, 1)"
                buttonTextAlignment={"flex-start"}
                textColor="black"
                LeftButtonIcon={FiUsers}
                buttonText={membership.teamName}
                buttonWidth="100%"
            />
        </NextLink>
    );
};
