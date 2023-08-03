"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Badge, Text, Box } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function Custombadge({
    badgeText,
    badgeColor,
    badgeVariant,
}: {
    badgeText?: string;
    badgeColor?: string;
    badgeVariant?: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box m={1}>
            <Badge
                colorScheme={badgeColor ? badgeColor : "default"}
                variant={badgeVariant ? badgeVariant : "outline"}
            >
                <Text p={0.1} m={1} fontSize={["xs", "sm", "md", "lg"]}>
                    {badgeText ? <>{badgeText}</> : <>Badge Text</>}
                </Text>
            </Badge>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
