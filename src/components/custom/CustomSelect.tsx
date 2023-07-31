"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { Select, FormControl, FormLabel } from "@chakra-ui/react";
// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
export interface SelectOptions {
    value: any;
    placeholder: string;
}
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomSelect({
    changeHandler,
    value,
    options,
    selectLabel,
    selectPlaceholder,
}: {
    changeHandler: (e: any) => void;
    value: any;
    options: SelectOptions[];
    selectLabel?: string;
    selectPlaceholder?: string;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <FormControl>
            {/* {value} */}
            <FormLabel>{selectLabel ? selectLabel : "Label:"}</FormLabel>
            <Select
                value={value}
                placeholder={
                    selectPlaceholder ? selectPlaceholder : "Select option"
                }
                onChange={(e) => {
                    changeHandler(e.target.value);
                }}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.placeholder}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
