"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { useToast } from "@chakra-ui/react";

// ==========================import custom components==========================
import LoadingDisplay from "@/components/general/LoadingDisplay";

// ==========================import external functions==========================
import { logoutUser } from "@/firebaseFunctions/authentication/userLogout";
import { userLoginProtection } from "@/routeProtectors";

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function LogoutPage() {
    // ===============constants===============
    const router = useRouter();
    const { userId, removeUser } = useUser();
    const toast = useToast();

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const checkLogout = async () => {
        userLoginProtection(userId, router);
        await logoutUser({ toast, removeUser, router });
    };

    // ===============useEffect===============
    useEffect(() => {
        checkLogout();
    }, []);

    return (
        <>
            <LoadingDisplay displayText="Logging out" width={60} />
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
