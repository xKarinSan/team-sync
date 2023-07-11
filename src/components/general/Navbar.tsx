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
    useBreakpointValue,
    useDisclosure,
    Drawer,
    DrawerContent,
    BoxProps,
    FlexProps,
    CloseButton,
    Link,
    Icon,
} from "@chakra-ui/react";
import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiUser,
    FiBell,
    FiMenu,
    FiLogOut
} from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { User } from "@/types/User/usertypes";
import useUser from "@/store/userStore";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [loading, setLoading] = useState<boolean>(true);
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
    const { user } = useUser();
    // console.log("user", user);
    useEffect(() => {
        setLoading(true);

        setLoading(false);
    }, [user]);

    return (
        <>
            {loading ? null : (
                <>
                    <Box>
                        {user ? (
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
                            </>
                        ) : (
                            <>
                                <Flex
                                    bg={useColorModeValue("white", "gray.800")}
                                    color={useColorModeValue(
                                        "gray.600",
                                        "white"
                                    )}
                                    minH={"60px"}
                                    py={{ base: 2 }}
                                    px={{ base: 4 }}
                                    borderBottom={1}
                                    borderStyle={"solid"}
                                    borderColor={useColorModeValue(
                                        "gray.200",
                                        "gray.900"
                                    )}
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
                                        <Text
                                            textAlign={useBreakpointValue({
                                                base: "center",
                                                md: "left",
                                            })}
                                            fontFamily={"heading"}
                                            color={useColorModeValue(
                                                "gray.800",
                                                "white"
                                            )}
                                        >
                                            Logo
                                        </Text>

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
                                        <Button
                                            fontSize={"sm"}
                                            fontWeight={400}
                                        >
                                            <NextLink href="/register">
                                                Sign Up
                                            </NextLink>
                                        </Button>

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
                                            <NextLink href="/login">
                                                Login
                                            </NextLink>
                                        </Button>
                                    </Stack>
                                </Flex>
                                <Collapse in={isOpen} animateOpacity>
                                    <MobileNav />
                                </Collapse>
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
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome },
    { name: "Teams", icon: FiUsers },
    { name: "Calendar", icon: FiCalendar },
    { name: "Profile", icon: FiUser },
    { name: "Notifications", icon: FiBell },
    { name: "Logout", icon: FiLogOut },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link
            href="#"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
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
                {children}
            </Flex>
        </Link>
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

            <Text
                fontSize="2xl"
                ml="8"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>
        </Flex>
    );
};

// =========================nav bar=========================

const DesktopNav = () => {
    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <NextLink href={`/${navItem.href}`}>
                                {navItem.label}
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
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
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
