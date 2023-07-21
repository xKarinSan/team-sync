"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Text } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { timeSlot } from "@/types/Calendar/CalendarTypes";

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TimeslotContainer({
    hour,
    minute,
    isSelected,
    handleSelectTimeslot,
}: {
    hour: number;
    minute: number;
    isSelected?: boolean;
    handleSelectTimeslot: (timeSlot: timeSlot) => void;
}) {
    // ===============constants===============
    const formatDigit = (time: number) => {
        if (time < 10) {
            return "0" + time.toString();
        } else {
            return time.toString();
        }
    };
    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box
            onClick={() => {
                handleSelectTimeslot({ hour, minute });
            }}
            _hover={{ cursor: "pointer" }}
        >
            <CustomContainer
                margin="0 auto"
                marginTop={1}
                marginBottom={1}
                width={["90%"]}
                containerColor={isSelected ? "#0747ED" : "white"}
            >
                <Text
                    fontSize={"lg"}
                    textAlign={"center"}
                    color={isSelected ? "white" : "black"}
                >
                    {formatDigit(hour)}:{formatDigit(minute)}
                </Text>
            </CustomContainer>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
