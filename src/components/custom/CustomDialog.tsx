"use client";

// ===================================all imports===================================

// ==========================import from react==========================
import React, { ReactNode, useRef } from "react";

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomButton from "./CustomButton";
// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomDialog({
    dialogTitle,
    isOpen,
    children,
    onSubmit,
    onCancel,
    onClose,
    submitText,
    cancelText,
}: // onSubmit,
// onCancel,
// onClose,
{
    dialogTitle?: string;
    isOpen: boolean;
    children?: ReactNode;
    onSubmit: () => void;
    onCancel: () => void;
    onClose: () => void;
    submitText?: string;
    cancelText?: string;
}) {
    // ===============constants===============
    const cancelRef = useRef<any>();
    // ===============states===============
    // ===============helper functions (will not be directly triggered)===============
    // ===============main functions (will be directly triggered)===============
    const triggerSubmit = () => {
        if (onSubmit) {
            onSubmit();
        }
        onClose();
    };
    const cancelSubmit = () => {
        if (onCancel) {
            onCancel();
        }
        onClose();
    };
    // ===============useEffect===============
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent minW={["100%", "70%", "60%", "50%", "40%"]}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {dialogTitle ? dialogTitle : "Dialogue Title"}
                    </AlertDialogHeader>

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        <CustomButton
                            buttonColor="grey"
                            clickFunction={cancelSubmit}
                            buttonText={cancelText ? cancelText : "Cancel"}
                        />

                        <CustomButton
                            clickFunction={triggerSubmit}
                            buttonText={submitText ? submitText : "Submit"}
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
