"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState, ReactNode } from "react";
// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Text, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomGrid from "@/components/general/CustomGrid";
import CustomContainer from "@/components/general/CustomContainer";

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
interface timeSlot {
    hour: number;
    minute: number;
}
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CalendarDayList({
    params,
}: {
    params: {
        currentDate: string;
    };
}) {
    // ===============constants===============

    // ===============states===============
    // ======for querying======
    const [selectedTimeslot, setSelectedTimeslot] = useState<timeSlot>({
        hour: -1,
        minute: -1,
    });

    const [year, setYear] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [day, setDay] = useState<number>();

    // ======for timeslots======
    const [timeSlots, setTimeSlots] = useState<timeSlot[]>([]);

    // ===============helper functions (will not be directly triggered)===============
    // for the date
    const triggerCurrentDate = () => {
        const [currentYear, currentMonth, currentDay] =
            params.currentDate.split("-");
        setYear(parseInt(currentYear));
        setMonth(parseInt(currentMonth));
        setDay(parseInt(currentDay));
    };

    // for timeslots
    const setupTimeslots = () => {
        const tempTimeSlots: timeSlot[] = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                tempTimeSlots.push({ hour: i, minute: j });
            }
        }
        setTimeSlots(tempTimeSlots);
    };

    // for the timeslot
    const handleSelectTimeslot = (timeslot: timeSlot) => {
        if (checkCurrentTimeslot(timeslot)) {
            setSelectedTimeslot({ hour: -1, minute: -1 });
        } else {
            setSelectedTimeslot(timeslot);
        }
    };
    const checkCurrentTimeslot = (timeslot: timeSlot) => {
        const { hour: newHour, minute: newMinute } = timeslot;
        const { hour: oldHour, minute: oldMinute } = selectedTimeslot;
        if (oldHour == newHour && oldMinute == newMinute) {
            return true;
        } else {
            return false;
        }
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        triggerCurrentDate();
        setupTimeslots();
    }, []);
    return (
        <Box>
            <Heading fontWeight={"normal"} size="xl">
                As of {params.currentDate}:
            </Heading>
            <CustomGrid gridCols={[2]}>
                <DatePageColumn columnTitle="Time">
                    {timeSlots.map((timeSlot, index) => {
                        const { hour, minute } = timeSlot;
                        return (
                            <TimeslotContainer
                                key={index}
                                hour={hour}
                                minute={minute}
                                handleSelectTimeslot={handleSelectTimeslot}
                                isSelected={checkCurrentTimeslot({
                                    hour,
                                    minute,
                                })}
                            />
                        );
                    })}
                </DatePageColumn>

                <DatePageColumn columnTitle="Deadlines"></DatePageColumn>
            </CustomGrid>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
const DatePageColumn = ({
    children,
    columnTitle,
}: {
    children?: ReactNode;
    columnTitle: string;
}) => {
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
};

const TimeslotContainer = ({
    hour,
    minute,
    isSelected,
    handleSelectTimeslot,
}: {
    hour: number;
    minute: number;
    isSelected?: boolean;
    handleSelectTimeslot: (timeSlot: timeSlot) => void;
}) => {
    // helper functions
    const formatDigit = (time: number) => {
        if (time < 10) {
            return "0" + time.toString();
        } else {
            return time.toString();
        }
    };

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
};
