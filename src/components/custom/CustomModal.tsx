"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { ReactNode } from "react";

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

// ==========================import custom components==========================
import CustomButton from "@/components/custom/CustomButton";

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function CustomModal({
    children,
    isOpen,
    onClose,
    modalTitle,
    actionWord,
    cancelWord,
    modalSubmitFunction,
    modalCancelFunction,
}: {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    actionWord: string;
    cancelWord?: string;
    modalSubmitFunction?: (...params: any[]) => void;
    modalCancelFunction?: (...params: any[]) => void;
}) {
    // ===============constants===============

    // ===============states===============

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const handleSubmit = () => {
        if (modalSubmitFunction) {
            modalSubmitFunction();
        }
        onClose();
    };

    const handleCancel = () => {
        if (modalSubmitFunction) {
            modalSubmitFunction();
        }
        onClose();
    };

    // ===============useEffect===============

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>

                    <ModalFooter>
                        <CustomButton
                            buttonColor="white"
                            textColor="black"
                            clickFunction={handleSubmit}
                            buttonText={cancelWord ? cancelWord : "Cancel"}
                            margin={1}
                        />
                        <CustomButton
                            clickFunction={handleCancel}
                            buttonText={actionWord ? actionWord : "Proceed"}
                            margin={1}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
