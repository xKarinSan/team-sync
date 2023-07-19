"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import React, { useEffect, useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { Box } from "@chakra-ui/react";

// ==========================import custom components==========================
import AuthenticationForm from "@/components/authentication/AuthenticationForm";

// ==========================import external functions==========================
import { emailRegistration } from "@/firebaseFunctions/authentication/emailAuthentication";
import { userLoggedProtection } from "@/routeProtectors";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function Home() {
    // ===============constants===============
    const router = useRouter();
    const { userId, addUser } = useUser();

    // ===============states===============
    const [loading, setLoading] = useState<boolean>(false);

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    useEffect(() => {
        setLoading(true);
        userLoggedProtection(userId, router);
        setLoading(false);
    });

    return (
        <Box>
            <AuthenticationForm
                isLogin={false}
                submitFunction={emailRegistration}
                setUser={addUser}
            />
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
