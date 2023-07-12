"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";
import { FiUser, FiUserPlus } from "react-icons/fi";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import CustomButton from "@/components/general/CustomButton";

// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamPage() {
    // ===============constants===============
    const router = useRouter();
    const { user, addUser } = useUser();
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
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
// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
