"use client";

// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
// import Image from "next/image";
// ==========================import state management==========================
import useUser from "@/store/userStore";
// import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import {
    Heading,
    Box,
    Text,
    Input,
    IconButton,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Image,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
// ==========================import custom components==========================
import LoadingDisplay from "@/components/general/LoadingDisplay";
import TeamBreadcrumbs from "@/components/team/TeamBreadcrumbs";
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomGrid from "@/components/general/CustomGrid";
// ==========================import external functions==========================
// =========== security ===========
// import { isMemberProtection } from "@/routeProtectors";
// =========== membership ===========
import { getAllTeamMembers } from "@/firebaseFunctions/memberships/membershipGet";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function MembersPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    // const {user} = useUser();
    // const
    // ===============states===============
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===============helper functions (will not be directly triggered)===============
    const initMembers = async () => {
        const teamMembers = await getAllTeamMembers(params.teamId);
        console.log("teamMembers", teamMembers);
        setMembers(teamMembers);
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        initMembers();
        // getAllTeamMembers(params.teamId);
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <LoadingDisplay displayText="Loading members..." />
                </>
            ) : (
                <Box>
                    <Heading fontWeight="normal" textAlign="center">
                        Members
                    </Heading>
                    <TeamBreadcrumbs currentPage="Members" />

                    <WhiteContainer>
                        <CustomGrid gridCols={[1, null, 2, null, 3, 4]}>
                            {members.map((member, index) => {
                                return (
                                    <MemberContainer
                                        member={member}
                                        key={index}
                                    />
                                );
                            })}
                        </CustomGrid>
                    </WhiteContainer>
                </Box>
            )}
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components

const MemberContainer = ({ member }: { member: any }) => {
    const { user } = useUser();

    const { username, userId, profilePic } = member;
    return (
        <WhiteContainer>
            <Box
                display={"flex"}
                width={"100%"}
                // justifyContent={"space-between"}
            >
                <Image
                    src={profilePic}
                    alt={username}
                    width={50}
                    height={50}
                    borderRadius={"50%"}
                    m={1}
                />
                <Text
                    noOfLines={1}
                    textAlign={"left"}
                    overflow="hidden"
                    textOverflow={"ellipsis"}
                    width={"-webkit-fill-available;"}
                    alignSelf={"center"}
                >
                    {userId == user.userId ? <>(Me)</> : null} {username}
                </Text>
                <Menu>
                    <MenuButton
                        alignSelf={"center"}
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        background="white"
                        boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                        right={"0"}
                    ></MenuButton>
                    <MenuList>
                        <MenuItem>
                            <MenuItem>View</MenuItem>
                        </MenuItem>
                        {userId != user.userId ? (
                            <>
                                <MenuItem>
                                    <MenuItem>Remove</MenuItem>
                                </MenuItem>
                            </>
                        ) : null}
                    </MenuList>
                </Menu>
            </Box>
        </WhiteContainer>
    );
};

const RequestContainer = () => {};
