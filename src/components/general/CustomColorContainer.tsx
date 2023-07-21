"use client";
// ===================================all imports===================================
// ==========================import from react==========================
import React from "react";

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Box } from "@chakra-ui/react";

// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomContainer({
    children,
    containerColor,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    width,
    margin,
    marginTop,
    marginBottom,
    overflow,
}: {
    children?: React.ReactNode;
    containerColor: string;
    minHeight?: string;
    minWidth?: string;
    maxHeight?: string;
    maxWidth?: string;
    width?: string[];
    margin?: string;
    marginTop?: number;
    marginBottom?: number;
    overflow?: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <Box
            width={width ? width : ["100%"]}
            background={containerColor ? containerColor : "white"}
            boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
            borderRadius={5}
            padding={2}
            margin={margin ? margin : "auto"}
            marginTop={marginTop ? marginTop : 5}
            marginBottom={marginBottom ? marginBottom : 5}
            minHeight={minHeight ? minHeight : 0}
            minWidth={minWidth ? minWidth : 0}
            maxHeight={maxHeight ? maxHeight : "auto"}
            maxWidth={maxWidth ? maxWidth : "auto"}
            overflow={overflow ? overflow : "auto"}
        >
            {children}
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
