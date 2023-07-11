"use client";

import MainMenu from "@/components/general/MainMenu";
import { MenuOption } from "@/types/HomePage/menuOptions";
import { useEffect } from "react";
import useUser from "@/store/userStore";
import { Heading, Box } from "@chakra-ui/react";

import TeamsImage from "../../images/homepage/TeamsImage.png";
import CalendarImage from "../../images/homepage/CalendarImage.png";
import ProfileImage from "../../images/homepage/ProfileImage.png";
import NotificationImage from "../../images/homepage/NotificationImage.png";
import LogoutImage from "../../images/homepage/LogoutImage.png";
import { userLoginProtection } from "@/routeProtectors";
import { useRouter } from "next/navigation";
export default function HomePage() {
    const { user } = useUser();
    const router = useRouter();
    const menuOptions: MenuOption[] = [
        {
            label: "Manage Teams",
            icon: TeamsImage,
            path: "/teams",
        },
        {
            label: "View Calendar",
            icon: CalendarImage,
            path: "/profile/calendar",
        },
        {
            label: "Manage Profile",
            icon: ProfileImage,
            path: "/home/profile",
        },
        {
            label: "Manage Notifications",
            icon: NotificationImage,
            path: "/home/notifications",
        },
        {
            label: "Logout",
            icon: LogoutImage,
            path: "/logout",
        },
    ];

    useEffect(() => {
        userLoginProtection(user, router);
    }, []);
    return (
        <Box p={10}>
            {user ? (
                <>
                    <Heading textAlign={"center"} fontWeight={"normal"}>
                        Hello {user.username}, what would you like to do today?
                    </Heading>
                </>
            ) : null}
            <MainMenu menuOptions={menuOptions} />
        </Box>
    );
}
