"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================

// ==========================import custom components==========================
import MainCalendar from "@/components/calendar/MainCalendar";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function TeamCalendarPage({
    params,
}: {
    params: { teamId: string };
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return <MainCalendar />;
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
