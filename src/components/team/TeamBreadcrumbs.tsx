"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================
import NextLink from "next/link";
// ==========================import state management==========================
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
// ==========================import custom components==========================
import WhiteContainer from "../general/WhiteContainer";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamBreadcrumbs({
    currentPage,
}: {
    currentPage: string;
}) {
    // ===============constants===============
    const { teamId } = useTeam();
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <WhiteContainer>
            <Breadcrumb separator=">">
                <BreadcrumbItem>
                    <NextLink href={`/team/${teamId}`}>
                        <Text>Back to Team</Text>
                    </NextLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Text>...</Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Text textDecoration={"underline"} color="#0131AE">
                        {currentPage}
                    </Text>
                </BreadcrumbItem>
            </Breadcrumb>
        </WhiteContainer>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
