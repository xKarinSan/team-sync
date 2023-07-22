"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState, ReactNode } from "react";
// ==========================import from next==========================
import NextLink from "next/link";
// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Box, Text, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomGrid from "@/components/custom/CustomGrid";
import CustomContainer from "@/components/custom/CustomContainer";

import DatePageColumn from "./DatePageColumn";
import TimeslotContainer from "./TimeslotContainer";
import AddDeadlineForm from "./AddDeadlineForm";
// ==========================import external functions==========================
import { getDeadlinesByDateTime } from "@/firebaseFunctions/deadlines/deadlineGet";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { timeSlot } from "@/types/Calendar/CalendarTypes";
import { DeadlineRecord } from "@/types/Deadline/deadlineTypes";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CurrentDay({ currentDate }: { currentDate: string }) {
    // ===============constants===============
    const { userId } = useUser();
    const { teamId } = useTeam();

    // ===============states===============
    // ======for querying======
    const [selectedTimeslot, setSelectedTimeslot] = useState<timeSlot>({
        hour: -1,
        minute: -1,
    });

    const [year, setYear] = useState<number>(-1);
    const [month, setMonth] = useState<number>(-1);
    const [day, setDay] = useState<number>(-1);

    // ======for timeslots======
    const [timeSlots, setTimeSlots] = useState<timeSlot[]>([]);
    const [deadlines, setDeadlines] = useState<DeadlineRecord[]>([]);

    // ===============helper functions (will not be directly triggered)===============
    // for the date
    const triggerCurrentDate = () => {
        const [currentYear, currentMonth, currentDay] = currentDate.split("-");
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

    // when selected timeslot changes
    const setCurrentDeadline = async () => {
        if (year != -1 && month != -1 && day != -1) {
            const currentDeadlinesAtTime = await getDeadlinesByDateTime(
                teamId ? teamId : userId,
                year,
                month,
                day,
                selectedTimeslot.hour,
                selectedTimeslot.minute
            );
            console.log("currentDeadlinesAtTime", currentDeadlinesAtTime);
            setDeadlines(currentDeadlinesAtTime);
        }
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        triggerCurrentDate();
        setupTimeslots();
    }, []);

    useEffect(() => {
        setCurrentDeadline();
    }, [selectedTimeslot]);

    return (
        <Box>
            <Heading fontWeight={"normal"} size="xl">
                As of {currentDate}:
            </Heading>
            <NextLink href={`/calendar`}>Back</NextLink>

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

                <DatePageColumn columnTitle="Deadlines">
                    <AddDeadlineForm
                        year={year}
                        month={month}
                        day={day}
                        hour={selectedTimeslot.hour}
                        minute={selectedTimeslot.minute}
                    />
                </DatePageColumn>
            </CustomGrid>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
