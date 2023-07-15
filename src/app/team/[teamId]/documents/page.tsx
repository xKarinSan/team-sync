"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";

// ==========================import from next==========================
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// ==========================import state management==========================
import useUser from "@/store/userStore";

// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";

// ==========================import custom components==========================
import WhiteContainer from "@/components/general/WhiteContainer";
import FileDropzone from "@/components/documents/FileDropzone";
// ==========================import external functions==========================
import { userLoginProtection } from "@/routeProtectors";
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
    const { user } = useUser();
    const router = useRouter();
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        userLoginProtection(user, router);
    });

    return (
        <Box>
            <Heading fontWeight={"nomral"}>Documents</Heading>
            <br />

            <WhiteContainer>
                <NextLink href={`/team/${params.teamId}`}>Back</NextLink>{" "}
            </WhiteContainer>
            <Heading fontWeight={"nomral"} size="md">
                Folders
            </Heading>
            <WhiteContainer></WhiteContainer>

            {/* <WhiteContainer>
                <Heading fontWeight={"nomral"} size="md">
                    Files
                </Heading>
            </WhiteContainer> */}
            <Heading fontWeight={"nomral"} size="md">
                Files
            </Heading>

            <FileDropzone folderId={params.teamId} />
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
