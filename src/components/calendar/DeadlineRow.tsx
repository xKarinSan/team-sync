"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Heading, Text } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
// ==========================import external functions==========================
import { formatDate } from "../helperFunctions/general/DateFunctions";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { DeadlineRecord } from "@/types/Deadline/deadlineTypes";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export function DeadlineRow({ deadline }: { deadline: DeadlineRecord }) {
    // ===============constants===============
    const { id, description, addedDateTime, updatedDateTime } = deadline;

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <CustomContainer>
            <Heading fontWeight={"normal"}>{description}</Heading>
            <Text>Created at: {formatDate(addedDateTime)}</Text>
            <Text>Last Modified: {formatDate(updatedDateTime)}</Text>
        </CustomContainer>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
