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
import CustomContainer from "@/components/custom/CustomContainer";
import CustomGrid from "@/components/custom/CustomGrid";
import CustomButton from "@/components/custom/CustomButton";
import CustomFormInput from "@/components/custom/CustomFormInput";
import CustomDialog from "@/components/custom/CustomDialog";

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
import defaultProfilePic from "../../../../images/general/defaultProfilePic.png";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function MembersPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    const { creatorId } = useTeam();
    const { userId } = useUser();
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
                        isDisabled={userId !== creatorId}
                    />
                    <InvitationBox isOpen={isOpen} onClose={onClose} />
                    <CustomContainer>
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
                    </CustomContainer>
                </Box>
            )}
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
interface currentUser {
    username: string;
    profilePic: string;
    userId: string;
}
// the rest are pretty much similar like the main components
function InvitationBox({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { userId } = useUser();
    const { teamId } = useTeam();
    const toast = useToast();

    const [allUsers, setAllUsers] = useState<currentUser[]>();
    const [allUsersDict, setAllUsersDict] = useState<{
        [key: string]: string[];
    }>({});
    const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
    const [memberName, setMembersName] = useState("");

    const getAllUsersHelper = async () => {
        let usersDict: { [key: string]: string[] } = await getUserDict();
        let currentUsers: currentUser[] = [];
        Object.keys(usersDict).forEach((currentUserId: string) => {
            if (!(userId == currentUserId)) {
                const [username, profilePic] = usersDict[currentUserId];
                currentUsers.push({
                    username,
                    profilePic,
                    userId: currentUserId,
                });
            }
        });
        setAllUsers(currentUsers);
        setAllUsersDict(usersDict);
    };
    

    const onSelectUser = (userId: string) => {
        let newMembers: string[] = [...invitedMembers];
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
                    formId={"addMemberName"}
                    placeholder="Enter member name or email"
                    formLabel="Member Name"
                    value={memberName}
                    changeHandler={setMembersName}
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
                                                src={
                                                    profilePic
                                                        ? profilePic
                                                        : defaultProfilePic.src
                                                }
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
                        {invitedMembers.map((invitedMember: string) => {
                            const [username, profilePic] =
                                allUsersDict[invitedMember];
                            return (
                                <CustomContainer key={invitedMember}>
                                    <Box display={"flex"}>
                                        <Image
                                            src={
                                                profilePic
                                                    ? profilePic
                                                    : defaultProfilePic.src
                                            }
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
                                            aria-label="Remove Invited User"
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
                                </CustomContainer>
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
    const { userId: currUserId } = useUser();
    const { creatorId } = useTeam();

    const { username, userId, profilePic } = member;
    return (
        <CustomContainer>
            <Box display={"flex"} width={"100%"}>
                <Image
                    src={profilePic ? profilePic : defaultProfilePic.src}
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
                    {userId == currUserId ? <>(Me)</> : null} {username}
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
                    />
                    <MenuList>
                        <MenuItem>
                            <MenuItem>View</MenuItem>
                        </MenuItem>
                        {userId != currUserId && currUserId == creatorId ? (
                            <>
                                <MenuItem>
                                    <MenuItem>Remove</MenuItem>
                                </MenuItem>
                            </>
                        ) : null}
                    </MenuList>
                </Menu>
            </Box>
        </CustomContainer>
    );
};

const RequestContainer = () => {};
