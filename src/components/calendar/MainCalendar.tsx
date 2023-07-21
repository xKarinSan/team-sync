"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState, useEffect } from "react";
// ==========================import from next==========================
import NextLink from "next/link";
import { useRouter } from "next/navigation";
// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomGrid from "../custom/CustomGrid";
import CustomContainer from "../custom/CustomContainer";
import LoadingDisplay from "../general/LoadingDisplay";
import CustomSelect from "../custom/CustomSelect";
import CustomButton from "../custom/CustomButton";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { SelectOptions } from "../custom/CustomSelect";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

const optionMonths: SelectOptions[] = [
    { value: 1, placeholder: "January" },
    { value: 2, placeholder: "February" },
    { value: 3, placeholder: "March" },
    { value: 4, placeholder: "April" },
    { value: 5, placeholder: "May" },
    { value: 6, placeholder: "June" },
    { value: 7, placeholder: "July" },
    { value: 8, placeholder: "August" },
    { value: 9, placeholder: "September" },
    { value: 10, placeholder: "October" },
    { value: 11, placeholder: "November" },
    { value: 12, placeholder: "December" },
];

export default function MainCalendar({}: {}) {
    // ===============constants===============
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // ===============states===============
    const [optionYears, setOptionYears] = useState<SelectOptions[]>([]);

    const [currentDay, setCurrentDay] = useState<number>(0);
    const [currentMonth, setCurrentMonth] = useState<number>(0);
    const [currentYear, setCurrentYear] = useState<number>(0);

    // const [days, setDays] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const handleMonthChange = (newMonth: number) => {
        if (!newMonth) {
            setMonth(currentMonth);
        } else {
            setMonth(newMonth);
        }
    };

    const [year, setYear] = useState<number>(0);
    const handleYearChange = (newYear: number) => {
        if (!newYear) {
            setYear(currentYear);
        } else {
            setYear(newYear);
        }
    };

    const [calendarDays, setCalendarDays] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // ===============helper functions (will not be directly triggered)===============
    const extractMonthAndYear = () => {
        const currDate = new Date(year, month, 0);
        var noOfDays = currDate.getDate();
        var firstDayOfMonth = new Date(
            currDate.getFullYear(),
            currDate.getMonth(),
            1,
            0,
            0,
            0,
            0
        );
        // console.log("firstDayOfMonth", firstDayOfMonth);
        var weekRows = [];
        var dayCounts = 0;
        var weekCounts = 0;
        while (dayCounts < noOfDays) {
            var weekRow = [];
            // day of the week
            for (var day = 0; day < 7; day++) {
                // first week
                if (weekCounts == 0) {
                    if (day < firstDayOfMonth.getDay()) {
                        weekRow.push("");
                    } else {
                        dayCounts += 1;
                        weekRow.push(dayCounts);
                    }
                } else {
                    if (dayCounts >= noOfDays) {
                        weekRow.push("");
                    } else {
                        dayCounts += 1;
                        weekRow.push(dayCounts);
                    }
                }
            }
            weekRows.push(weekRow);
            weekCounts += 1;
        }
        setCalendarDays(weekRows);
    };
    const getTodayDate = () => {
        const currDate = new Date();
        const currDay = currDate.getDate();
        const currMonth = currDate.getMonth();
        const currYear = currDate.getFullYear();
        setMonth(currMonth + 1);
        setYear(currYear);

        setCurrentDay(currDay);
        setCurrentMonth(currMonth + 1);
        setCurrentYear(currYear);

        // set the options
        const allOptionYear: SelectOptions[] = [];
        for (var i = currYear; i > 1900 - 1; i--) {
            allOptionYear.push({
                value: i,
                placeholder: i.toString(),
            });
        }
        setOptionYears(allOptionYear);
    };

    // ===============main functions (will be directly triggered)===============
    const exportEvents = () => {};

    // ===============useEffect===============
    // when month or year change
    useEffect(() => {
        setLoading(true);
        getTodayDate();

        extractMonthAndYear();
        setLoading(false);
    }, []);

    // init month and year
    useEffect(() => {
        extractMonthAndYear();
    }, [month, year]);

    return (
        <>
            {loading ? (
                <LoadingDisplay />
            ) : (
                <>
                    <Box>
                        <Heading size={"lg"} fontWeight={"normal"}>
                            Calendar
                        </Heading>
                        <CustomContainer>
                            <CustomGrid gridCols={[1, null, 2, 4]}>
                                {optionYears.length > 0 ? (
                                    <>
                                        {" "}
                                        <CustomSelect
                                            changeHandler={handleYearChange}
                                            value={year}
                                            options={optionYears}
                                            selectPlaceholder="Select Year"
                                            selectLabel="Year:"
                                        />
                                    </>
                                ) : null}

                                {optionMonths.length > 0 ? (
                                    <>
                                        {" "}
                                        <CustomSelect
                                            changeHandler={handleMonthChange}
                                            value={month ? month : currentMonth}
                                            options={optionMonths}
                                            selectPlaceholder="Select Month"
                                            selectLabel="Month:"
                                        />
                                    </>
                                ) : null}
                                {/* <CustomButton
                                    buttonText="Export"
                                    clickFunction={exportEvents}
                                /> */}
                            </CustomGrid>
                        </CustomContainer>
                        <CustomContainer>
                            {" "}
                            <CustomGrid gridCols={[7]}>
                                {weekdays.map((day, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            background="#0239C8"
                                            margin={0.5}
                                            p={2}
                                            borderRadius={5}
                                        >
                                            <Heading
                                                textAlign="center"
                                                color="white"
                                                size="sm"
                                                fontWeight={"medium"}
                                            >
                                                {day}
                                            </Heading>
                                        </Box>
                                    );
                                })}
                                {calendarDays.map((week, index) => {
                                    return (
                                        <>
                                            {" "}
                                            {week.map(
                                                (
                                                    calendarDay: number,
                                                    index: number
                                                ) => {
                                                    // console.log("day", day);
                                                    return (
                                                        <>
                                                            <CalendarCell
                                                                key={index}
                                                                year={year}
                                                                month={month}
                                                                day={
                                                                    calendarDay
                                                                }
                                                                isToday={
                                                                    currentDay ==
                                                                        calendarDay &&
                                                                    currentMonth ==
                                                                        month &&
                                                                    currentYear ==
                                                                        year
                                                                }
                                                            />
                                                        </>
                                                    );
                                                }
                                            )}
                                        </>
                                    );
                                })}
                            </CustomGrid>
                        </CustomContainer>
                    </Box>
                </>
            )}
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
function CalendarCell({
    year,
    month,
    day,
    isToday,
}: {
    year: number;
    month: number;
    day?: number;
    isToday?: boolean;
}) {
    const router = useRouter();
    const redirectToGivenDay = () => {
        if (day && month && day) {
            router.push(`/calendar/${year}-${month}-${day}`);
        }
    };
    return (
        // <Box>
        <Box
            background={day ? (isToday ? "#0239C8" : "#3d73ff") : "FFFFFF"}
            transition={"background-color 200ms linear, color 200ms linear"}
            margin={0.5}
            p={2}
            borderRadius={[5, null, 10]}
            height={["50px", "75px", "100px"]}
            alignContent={"center"}
            boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.25);"}
            onClick={redirectToGivenDay}
            _hover={{
                background: day ? (isToday ? "#0e1834" : "#244ebd") : "FFFFFF",
                cursor: day ? "pointer" : "default",
            }}
        >
            <Heading
                textAlign="center"
                color="white"
                size="sm"
                fontWeight={"medium"}
                margin="auto"
            >
                {day}
            </Heading>
        </Box>
        // </Box>
    );
}
