"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState } from "react";
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
import { DeadlineRow } from "./DeadlineRow";
// ==========================import external functions==========================
import {
    realtimeDeadlineChanges,
    getAllDeadlines,
    retrieveAllDeadlinesDateTime,
} from "@/firebaseFunctions/deadlines/deadlineGet";
import { getUserDeadlines } from "@/firebaseFunctions/deadlines/deadlineGet";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { timeSlot } from "@/types/Calendar/CalendarTypes";
import {
    DeadlineRecord,
    DeadlineWithTimestamp,
} from "@/types/Deadline/deadlineTypes";
import { getAllMemberships } from "@/firebaseFunctions/memberships/membershipGet";
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
    const [filteredDeadlines, setFilteredDeadlines] = useState<
        DeadlineRecord[]
    >([]);

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
    const displayFilteredDeadlines = () => {
        const temp = deadlines.filter((deadline) => {
            const { hour, minute } = selectedTimeslot;
            const {
                year: deadlineYear,
                month: deadlineMonth,
                day: deadlineDay,
                hour: deadlineHour,
                minute: deadlineMinute,
            } = deadline;
            return (
                year == deadlineYear &&
                month == deadlineMonth &&
                day == deadlineDay &&
                hour == deadlineHour &&
                minute == deadlineMinute
            );
        });
        setFilteredDeadlines(temp);
    };

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {
        triggerCurrentDate();
        // this should find all the memberships
        getAllDeadlines();
        getUserDeadlines(userId);
        realtimeDeadlineChanges(
            teamId ? teamId : userId,
            teamId ? true : false,
            setDeadlines
        );
        // getAllMemberships();
        // retrieveAllDeadlinesDateTime()
        setupTimeslots();
    }, []);

    useEffect(() => {
        displayFilteredDeadlines();
    }, [selectedTimeslot, deadlines]);

    return (
        <Box>
            <Heading fontWeight={"normal"} size="xl">
                As of {currentDate}:
            </Heading>
            <NextLink href={teamId ? `/team/${teamId}/calendar` : `/calendar`}>
                Back
            </NextLink>

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
                    {filteredDeadlines.length > 0 ? (
                        <>
                            {filteredDeadlines.map(
                                (deadline: DeadlineRecord) => {
                                    const {
                                        id: deadlineId,
                                        userId,
                                        description,

                                        teamId,

                                        year,
                                        month,
                                        day,
                                        hour,
                                        minute,

                                        deadlineDateTime,
                                        addedDateTime,
                                        updatedDateTime,
                                    } = deadline;
                                    const deadlineWithTimestamp: DeadlineWithTimestamp =
                                        {
                                            userId,
                                            description,

                                            teamId,

                                            year,
                                            month,
                                            day,
                                            hour,
                                            minute,

                                            deadlineDateTime,
                                            addedDateTime,
                                            updatedDateTime,
                                        };

                                    return (
                                        <DeadlineRow
                                            key={deadlineId}
                                            deadline={deadlineWithTimestamp}
                                            deadlineId={deadlineId}
                                        />
                                    );
                                }
                            )}
                        </>
                    ) : (
                        <>
                            <CustomContainer>
                                <Text>No deadlines</Text>
                            </CustomContainer>
                        </>
                    )}
                </DatePageColumn>
            </CustomGrid>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
