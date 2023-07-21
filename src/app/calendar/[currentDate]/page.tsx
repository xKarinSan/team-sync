"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect, useState, ReactNode } from "react";
// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box, Text, Heading } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomGrid from "@/components/custom/CustomGrid";
import CustomContainer from "@/components/custom/CustomContainer";
import CurrentDay from "@/components/calendar/CurrentDay";

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CalendarDayListPage({
    params,
}: {
    params: {
        currentDate: string;
    };
}) {
    // ===============constants===============

    // ===============states===============

    // ======for querying======

    // ======for timeslots======

    // ===============helper functions (will not be directly triggered)===============
    // for the date

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============
    useEffect(() => {}, []);
    return <CurrentDay currentDate={params.currentDate} />;
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
