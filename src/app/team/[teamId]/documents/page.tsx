"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { use, useEffect } from "react";
// ==========================import from next==========================

// ==========================import state management==========================
import useFolders from "@/store/folderStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================

// ==========================import custom components==========================
import DocumentPageTemplate from "@/components/documents/DocumentPageTemplate";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamDocumentPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============
    // const { teamId } = params;
    const { addFolder, folders } = useFolders();

    // ===============states===============
    const { teamId, teamName } = useTeam();
    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        if (teamId && teamName) {
            if (folders.length > 0) {
                return;
            }
            addFolder(teamId, teamName);
        }
    }, []);

    return <DocumentPageTemplate />;
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
