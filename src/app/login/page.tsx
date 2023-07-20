"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import React, { useState } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { Box } from "@chakra-ui/react";

// ==========================import custom components==========================
import AuthenticationForm from "@/components/authentication/AuthenticationForm";
// ==========================import external functions==========================
import { emailLogin } from "@/firebaseFunctions/authentication/emailAuthentication";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function Home() {
    // ===============constants===============
    const router = useRouter();
    const { addUser } = useUser();

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

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

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
