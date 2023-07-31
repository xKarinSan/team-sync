"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState } from "react";
// ==========================import from next==========================

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { useToast } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
import CustomFormInput from "../custom/CustomFormInput";
import CustomButton from "../custom/CustomButton";
// ==========================import external functions==========================
import { addDeadlineRecord } from "@/firebaseFunctions/deadlines/deadlineAdd";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function AddDeadlineForm({
    year,
    month,
    day,
    hour,
    minute,
}: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}) {
    // ===============constants===============
    const { userId } = useUser();
    const { teamId } = useTeam();
    const toast = useToast();

    // ===============states===============
    const [description, setDescription] = useState<string>("");

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const handleAddDeadline = async () => {
        if (
            hour === -1 ||
            minute === -1 ||
            year === -1 ||
            month === -1 ||
            day === -1
        )
            toast({
                title: "Please select a date and timeslot",
                status: "error",
            });
        else if (description === "") {
            toast({
                title: "Please add a description",
                status: "error",
            });
        } else {
            // trigger firebase function to add deadline
            const addDeadlineRes = await addDeadlineRecord({
                userId,
                teamId: teamId ? teamId : userId,
                year,
                month,
                day,
                hour,
                minute,
                description,
            });
            if (addDeadlineRes) {
                toast({
                    title: "Deadline added",
                    status: "success",
                });
                setDescription("");
            } else {
                toast({
                    title: "Error adding deadline",
                    status: "error",
                });
            }
        }
    };

    // ===============useEffect===============

    return (
        <CustomContainer margin="0">
            <CustomFormInput
                formId={"addDescription"}
                formLabel="Description:"
                placeholder="Add a description"
                value={description}
                changeHandler={setDescription}
            />
            <br />
            <CustomButton
                buttonText="Add"
                clickFunction={() => handleAddDeadline()}
            />
        </CustomContainer>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
