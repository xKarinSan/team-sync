"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useEffect } from "react";
// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
// ==========================import custom components==========================
import CurrentDay from "@/components/calendar/CurrentDay";

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamCalendarDayListPage({
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
