"use client";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Popover,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    Drawer,
    DrawerContent,
    BoxProps,
    FlexProps,
    CloseButton,
    Icon,
    Image,
    Heading,
} from "@chakra-ui/react";
import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiUser,
    FiBell,
    FiMenu,
    FiLogOut,
    FiFolder,
    FiMessageSquare,
    FiArrowLeft,
} from "react-icons/fi";
import { IconType } from "react-icons";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

import NextLink from "next/link";
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
import { useState, useEffect, ReactNode } from "react";
import TeamsyncLogo from "@/images/general/TeamsyncLogo.png";
import { leaveChat } from "@/firebaseFunctions/chats/chatDelete";
import { leaveConference } from "@/firebaseFunctions/conferences/conferenceOperations";

export default function Navbar({ children }: { children: ReactNode }) {
    const pathName = usePathname();
    const [loading, setLoading] = useState<boolean>(true);
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
    const { userId } = useUser();

    useEffect(() => {
        setLoading(true);

        setLoading(false);
    }, [userId, pathName]);
    return (
        <>
            {loading ? null : (
                <>
                    <Box>
                        {userId ? (
                            <>
                                <SidebarContent
                                    onClose={() => onClose}
                                    display={{ base: "none", md: "block" }}
                                />
                                <Drawer
                                    autoFocus={false}
                                    isOpen={isOpen}
                                    placement="left"
                                    onClose={onClose}
                                    returnFocusOnClose={false}
                                    onOverlayClick={onClose}
                                    size="full"
                                >
                                    <DrawerContent>
                                        <SidebarContent onClose={onClose} />
                                    </DrawerContent>
                                </Drawer>
                                <SideMobileNav
                                    display={{ base: "flex", md: "none" }}
                                    onOpen={onOpen}
                                />
                                <Box
                                    ml={{ base: 0, md: 60 }}
                                    p={5}
                                    background={"#EEF2F6"}
                                    minHeight={"100vh"}
                                    display="grid"
                                >
                                    {children}
                                </Box>
                            </>
                        ) : (
                            <>
                                <Flex
                                    color={"gray.600"}
                                    minH={"60px"}
                                    py={{ base: 2 }}
                                    px={{ base: 4 }}
                                    borderBottom={1}
                                    borderStyle={"solid"}
                                    borderColor={"gray.200"}
                                    align={"center"}
                                >
                                    <Flex
                                        flex={{ base: 1, md: "auto" }}
                                        ml={{ base: -2 }}
                                        display={{ base: "flex", md: "none" }}
                                    >
                                        <IconButton
                                            onClick={onToggle}
                                            icon={
                                                isOpen ? (
                                                    <CloseIcon w={3} h={3} />
                                                ) : (
                                                    <HamburgerIcon
                                                        w={5}
                                                        h={5}
                                                    />
                                                )
                                            }
                                            variant={"ghost"}
                                            aria-label={"Toggle Navigation"}
                                        />
                                    </Flex>
                                    <Flex
                                        flex={{ base: 1 }}
                                        justify={{
                                            base: "center",
                                            md: "start",
                                        }}
                                    >
                                        <NextLink href="/">
                                            <Image
                                                src={TeamsyncLogo.src}
                                                alt="Logo"
                                                width="120px"
                                                m="auto"
                                            />
                                        </NextLink>

                                        <Flex
                                            display={{
                                                base: "none",
                                                md: "flex",
                                            }}
                                            ml={10}
                                        >
                                            <DesktopNav />
                                        </Flex>
                                    </Flex>
                                    <Stack
                                        flex={{ base: 1, md: 0 }}
                                        justify={"flex-end"}
                                        direction={"row"}
                                        spacing={6}
                                    >
                                        <NextLink href="/register">
                                            <Button
                                                fontSize={"sm"}
                                                fontWeight={400}
                                            >
                                                Sign Up
                                            </Button>
                                        </NextLink>

                                        <NextLink href="/login">
                                            <Button
                                                display={{
                                                    base: "none",
                                                    md: "inline-flex",
                                                }}
                                                fontSize={"sm"}
                                                color={"white"}
                                                bg={"#0239C8"}
                                                _hover={{
                                                    bg: "rgba(2, 57, 200, 0.3)",
                                                }}
                                            >
                                                Login
                                            </Button>
                                        </NextLink>
                                    </Stack>
                                </Flex>
                                <Collapse in={isOpen} animateOpacity>
                                    <MobileNav />
                                </Collapse>
                                <Box>{children}</Box>
                            </>
                        )}
                    </Box>
                </>
            )}
        </>
    );
}
// =========================side bar=========================
interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path: "/home" },
    { name: "Teams", icon: FiUsers, path: "/teams" },
    { name: "Calendar", icon: FiCalendar, path: "/calendar" },
    { name: "Profile", icon: FiUser, path: "/profile" },
    { name: "Notifications", icon: FiBell, path: "/notifications" },
    { name: "Logout", icon: FiLogOut, path: "/logout" },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const pathName = usePathname();

    const { teamId, removeTeam } = useTeam();
    const { userId } = useUser();

    const [sidebarItems, setSidebarItems] = useState<LinkItemProps[]>([]);

    const setCurrentTeamItems = (teamId: string): LinkItemProps[] => {
        return [
            { name: "Back Home", icon: FiArrowLeft, path: "/teams" },
            {
                name: "Team Homepage",
                icon: FiHome,
                path: `/team/${teamId}`,
            },
            {
                name: "Documents",
                icon: FiFolder,
                path: `/team/${teamId}/documents`,
            },
            {
                name: "Calendar",
                icon: FiCalendar,
                path: `/team/${teamId}/calendar`,
            },
            {
                name: "Meeting",
                icon: FiUsers,
                path: `/team/${teamId}/meetings`,
            },
            {
                name: "Chat",
                icon: FiMessageSquare,
                path: `/team/${teamId}/chat`,
            },
            { name: "Members", icon: FiUsers, path: `/team/${teamId}/members` },
        ];
    };
    const handleLeavingChat = async () => {
        if (userId && teamId) {
            await leaveChat(teamId, userId);
        }
    };
    const handleLeavingConference = async () => {
        if (userId && teamId) {
            await leaveConference(teamId, userId);
        }
    };
    useEffect(() => {
        if (!pathName.includes("/team/")) {
            handleLeavingChat();
            handleLeavingConference();
            removeTeam();
            setSidebarItems(LinkItems);
        } else {
            if (!pathName.includes("/chat")) {
                // alert("pathName" + pathName);
                handleLeavingChat();
            }
            if (!pathName.includes("/meetings/current")) {
                handleLeavingConference();
            }
            setSidebarItems(setCurrentTeamItems(teamId));
        }
    }, [pathName]);
    return (
        <Box
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    textAlign={["center", null, "left"]}
                    fontFamily={"heading"}
                    color={"gray.800"}
                >
                    <NextLink href="/">
                        <Image
                            src={TeamsyncLogo.src}
                            alt="Logo"
                            width="150px"
                            m="0 auto"
                        />
                    </NextLink>
                </Text>

                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {sidebarItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    path={link.path}
                    text={link.name}
                />
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    path: string;
    text: string;
}
const NavItem = ({ icon, path, text }: NavItemProps) => {
    return (
        <NextLink href={path}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "#0239C8",
                    color: "white",
                }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {text}
            </Flex>
        </NextLink>
    );
};

interface SideMobileProps extends FlexProps {
    onOpen: () => void;
}
const SideMobileNav = ({ onOpen, ...rest }: SideMobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <NextLink href="/">
                <Text
                    textAlign={["center", null, "left"]}
                    fontFamily={"heading"}
                    color={"gray.800"}
                >
                    <Image
                        src={TeamsyncLogo.src}
                        alt="Logo"
                        width="150px"
                        m="auto"
                    />
                </Text>
            </NextLink>
        </Flex>
    );
};

// =========================nav bar=========================

const DesktopNav = () => {
    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} margin={"auto"}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <NextLink href={`/${navItem.href}`}>
                                <Heading size="md" fontWeight={"normal"}>
                                    {navItem.label}
                                </Heading>
                            </NextLink>
                        </PopoverTrigger>
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <NextLink href={`/${href}`}>
                <Heading
                    fontWeight={600}
                    size="md"
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Heading>
            </NextLink>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Home",
        href: "#home",
    },
    {
        label: "About Us",
        href: "#about",
    },
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "Contact Us",
        href: "#contact",
    },
];
