"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, CircularProgress, Heading } from "@chakra-ui/react";

// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
interface loadingDisplayProps {
    displayText: string;
    width: number;
}

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function LoadingDisplay({
    displayText,
    width,
}: loadingDisplayProps) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box
            background="white"
            margin={"10px auto"}
            p={5}
            borderRadius={5}
            width={`${width ? width : 100}%`}
            display="grid"
            alignSelf="center"
        >
            <CircularProgress
                isIndeterminate={true}
                margin={"auto"}
                color="#0239C8"
            />
            <Heading textAlign="center">{displayText}</Heading>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
