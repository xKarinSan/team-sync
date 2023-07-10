"use client";
import React from "react";
import { Box } from "@chakra-ui/react";

import AuthenticationForm from "@/components/authentication/AuthenticationForm";
import { emailLogin } from "@/firebaseFunctions/authentication/emailAuthentication";
import useUser from "@/store/userStore";
export default function Home() {
    const { addUser } = useUser();
    return (
        <Box>
            <AuthenticationForm
                isLogin={true}
                submitFunction={emailLogin}
                setUser={addUser}
            />
        </Box>
    );
}
