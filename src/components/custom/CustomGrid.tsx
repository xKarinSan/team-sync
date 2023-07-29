"use client";

// ===================================all imports===================================

// ==========================import from react==========================
import { ReactNode } from "react";

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { SimpleGrid } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomGrid({
    children,
    gridCols,
    spacing,
    ref,
}: {
    children: ReactNode;
    gridCols?: any[];
    spacing?: number;
    ref?: any;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <SimpleGrid
            ref={ref}
            columns={gridCols ? gridCols : [2, null, 3, 4, 6]}
            spacing={spacing ? spacing : 1}
        >
            {children}
        </SimpleGrid>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
