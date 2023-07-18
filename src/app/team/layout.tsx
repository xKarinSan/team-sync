"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { ReactNode, useEffect } from "react";
// ==========================import from next==========================
import { useRouter } from "next/navigation";
// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================

// ==========================import custom components==========================

// ==========================import external functions==========================
// ============protection===========
import { isMemberProtection } from "@/routeProtectors";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function ComponentName({ children }: { children: ReactNode }) {
    // ===============constants===============
    const router = useRouter();
    const { user } = useUser();
    const { teamId } = useTeam();
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        isMemberProtection(user, teamId, router);
    });
    return <>{children}</>;
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
