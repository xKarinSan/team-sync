"use client";
import { useEffect } from "react";
import { Box, Heading, Button, Icon, Text, IconButton } from "@chakra-ui/react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import useUser from "@/store/userStore";
import { useRouter } from "next/navigation";
import { userLoginProtection } from "@/routeProtectors";
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomButton from "@/components/general/CustomButton";
export default function TeamPage() {
    const router = useRouter();
    const { user, addUser } = useUser();
    useEffect(() => {
        userLoginProtection(user, router);
    });
    return (
        <Box>
            <Heading fontWeight={"normal"}>Teams</Heading>
            <CustomButton LeftButtonIcon={FiUser} buttonText="Create Team" />
            <WhiteContainer>HELLO</WhiteContainer>
            <WhiteContainer minHeight={"100vh"}>HELLO</WhiteContainer>
        </Box>
    );
}
