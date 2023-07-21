"use client";
// ===================================all imports===================================

// ==========================import from react==========================
// ==========================import from next==========================
import Image from "next/image";

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "./CustomContainer";

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================
import NoResults from "../../images/general/NoResults.png";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function NoRecordsDisplay({
    displayText,
}: {
    displayText?: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <CustomContainer width={["80%", "60%", "40%"]}>
            <Box display="grid" margin="auto" width="100%">
                <Box margin="auto">
                    <Image
                        src={NoResults}
                        alt="No results"
                        objectFit="contain"
                    />
                    <Heading textAlign={"center"} fontWeight={"normal"}>
                        {displayText ? (
                            <>{displayText}</>
                        ) : (
                            <> No results found . . .</>
                        )}
                    </Heading>
                </Box>
            </Box>
        </CustomContainer>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
