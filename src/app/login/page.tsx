"use client";
import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import AuthenticationForm from "@/components/authentication/AuthenticationForm";
import { emailLogin } from "@/firebaseFunctions/authentication/emailAuthentication";
import useUser from "@/store/userStore";
import { userLoggedProtection } from "@/routeProtectors";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { user, addUser } = useUser();

    useEffect(() => {
        userLoggedProtection(user, router);
    });
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
