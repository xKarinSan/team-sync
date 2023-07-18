"use client";

// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
// ==========================import from next==========================
// import Image from "next/image";
// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
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
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FiMoreVertical, FiUserPlus, FiSearch, FiX } from "react-icons/fi";
// ==========================import custom components==========================
import LoadingDisplay from "@/components/general/LoadingDisplay";
import TeamBreadcrumbs from "@/components/team/TeamBreadcrumbs";
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomGrid from "@/components/general/CustomGrid";
import CustomButton from "@/components/general/CustomButton";
import CustomFormInput from "@/components/general/CustomFormInput";
import CustomDialog from "@/components/general/CustomDialog";

// ==========================import external functions==========================
// =========== security ===========
// =========== membership ===========
import { massInvite } from "@/firebaseFunctions/memberships/membershipAdd";
import { realtimeMembershipChanges } from "@/firebaseFunctions/memberships/membershipGet";
// =========== users ===========
import { getUserDict } from "@/firebaseFunctions/users/usersGet";

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
    const { creatorId } = useTeam();
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // ===============states===============
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        setLoading(true);
        realtimeMembershipChanges(params.teamId, setMembers);
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
                    <CustomButton
                        LeftButtonIcon={FiUserPlus}
                        clickFunction={onOpen}
                        buttonText={"Invite Teammates"}
                        isDisabled={user.userId !== creatorId}
                    />
                    <InvitationBox isOpen={isOpen} onClose={onClose} />
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
export function InvitationBox({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { user } = useUser();
    const { teamId } = useTeam();
    const toast = useToast();

    const [allUsers, setAllUsers] = useState();
    const [allUsersDict, setAllUsersDict] = useState({});
    const [invitedMembers, setInvitedMembers] = useState([]);
    const [memberName, setMembersName] = useState("");

    const getAllUsersHelper = async () => {
        let usersDict = await getUserDict();
        let currentUsers = [];
        Object.keys(usersDict).forEach((userId) => {
            if (!(userId == user.userId)) {
                const [username, profilePic] = usersDict[userId];
                currentUsers.push({ username, profilePic, userId });
            }
        });
        setAllUsers(currentUsers);
        setAllUsersDict(usersDict);
    };

    const onSelectUser = (userId: string) => {
        let newMembers = [...invitedMembers];
        if (!newMembers.includes(userId)) {
            newMembers.push(userId);
        } else {
            newMembers = newMembers.filter((memberId) => {
                return memberId !== userId;
            });
        }
        setInvitedMembers(newMembers);
    };

    const deleteUser = (userId: string) => {
        let newMembers = [...invitedMembers];
        newMembers = newMembers.filter((memberId) => {
            return memberId !== userId;
        });
        setInvitedMembers(newMembers);
    };

    const triggerSubmit = async () => {
        const invited = await massInvite(invitedMembers, teamId);
        if (invited) {
            toast({ title: "Invitation(s) sent", status: "success" });
            setInvitedMembers([]);
        } else {
            toast({ title: "Invitation(s) failed to send", status: "error" });
        }
    };
    const cancelSubmit = () => {
        setInvitedMembers([]);
    };

    useEffect(() => {
        getAllUsersHelper();
    }, []);
    return (
        <CustomDialog
            dialogTitle="Add Member"
            isOpen={isOpen}
            onSubmit={triggerSubmit}
            onCancel={cancelSubmit}
            onClose={onClose}
        >
            <Box display={"flex"}>
                <CustomFormInput
                    id={"addMemberName"}
                    placeholder="Enter member name or email"
                    formLabel="Member Name"
                    value={memberName}
                    changeHandler={(e) => setMembersName(e.target.value)}
                />
                <Menu>
                    <MenuButton
                        border={"none"}
                        alignSelf={"flex-end"}
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiSearch />}
                        variant="outline"
                        size="sm"
                        m={1}
                    />
                    <MenuList>
                        {allUsers && allUsers.length > 0 ? (
                            <>
                                {allUsers.map((user) => {
                                    const { userId, username, profilePic } =
                                        user;
                                    return (
                                        <MenuItem
                                            key={userId}
                                            onClick={() => {
                                                onSelectUser(userId);
                                            }}
                                        >
                                            <Image
                                                src={profilePic}
                                                alt={username}
                                                height="25px"
                                                width="25px"
                                                borderRadius={"50%"}
                                                m={1}
                                            />
                                            <Text>{username}</Text>
                                        </MenuItem>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <MenuItem>
                                    <Text>No members available</Text>
                                </MenuItem>
                            </>
                        )}
                    </MenuList>
                </Menu>
            </Box>
            <br />
            <Heading size={"md"} fontWeight={"normal"}>
                Invited Members
            </Heading>
            {invitedMembers && invitedMembers.length > 0 ? (
                <>
                    <CustomGrid gridCols={[1, null, null, 2]}>
                        {invitedMembers.map((invitedMember) => {
                            const [username, profilePic] =
                                allUsersDict[invitedMember];
                            return (
                                <WhiteContainer key={invitedMember}>
                                    <Box display={"flex"}>
                                        <Image
                                            src={profilePic}
                                            alt={username}
                                            height="25px"
                                            width="25px"
                                            borderRadius={"50%"}
                                            alignSelf={"center"}
                                            // margin ={"5px auto"}
                                        />
                                        <Text
                                            noOfLines={1}
                                            textAlign={"left"}
                                            overflow="hidden"
                                            textOverflow={"ellipsis"}
                                            width={"-webkit-fill-available"}
                                            alignSelf={"center"}
                                        >
                                            {username}
                                        </Text>
                                        <IconButton
                                            onClick={() => {
                                                deleteUser(invitedMember);
                                            }}
                                            border={"none"}
                                            icon={<FiX />}
                                            variant="outline"
                                            size="sm"
                                            m={1}
                                        />
                                    </Box>
                                </WhiteContainer>
                            );
                        })}
                    </CustomGrid>
                </>
            ) : (
                <>
                    <Text>Invite some members?</Text>
                </>
            )}
        </CustomDialog>
    );
}

const MemberContainer = ({ member }: { member: any }) => {
    const { user } = useUser();
    const { creatorId } = useTeam();

    const { username, userId, profilePic } = member;
    return (
        <WhiteContainer>
            <Box display={"flex"} width={"100%"}>
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
                    width={"-webkit-fill-available"}
                    alignSelf={"center"}
                >
                    {userId == creatorId ? <>(Owner)</> : null}
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
                        {userId != user.userId && user.userId == creatorId ? (
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
