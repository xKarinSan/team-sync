"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { ReactNode } from "react";
// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function DatePageColumn({
    children,
    columnTitle,
}: {
    children?: ReactNode;
    columnTitle: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box>
            <CustomContainer>
                <Heading fontWeight={"normal"} size="lg" textAlign={"center"}>
                    {columnTitle}
                </Heading>
            </CustomContainer>
            <CustomContainer minHeight="80vh" maxHeight="80vh">
                {children ? children : <></>}
            </CustomContainer>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
