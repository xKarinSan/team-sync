"use client";
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomFormInput({
    placeholder,
    formLabel,
    formType,
    value,
    formId,
    changeHandler,
}: {
    placeholder?: string;
    formLabel?: string;
    formType?: string;
    value: any;
    formId: string;
    changeHandler: (e: any) => void;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============

    // ===============useEffect===============

    return (
        <FormControl id={formId}>
            {formLabel ? (
                <>
                    <FormLabel>{formLabel}</FormLabel>
                </>
            ) : null}

            <Input
                type={formType ? formType : "text"}
                placeholder={placeholder ? placeholder : "Enter a placeholder"}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </FormControl>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
