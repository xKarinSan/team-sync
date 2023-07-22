"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState } from "react";
// ==========================import from next==========================

// ==========================import state management==========================
import useUser from "@/store/userStore";
import useTeam from "@/store/teamStore";
// ==========================import chakraui components==========================
import { Heading, Text, useToast, Box } from "@chakra-ui/react";
// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
import CustomButton from "../custom/CustomButton";
import CustomFormInput from "../custom/CustomFormInput";
// ==========================import external functions==========================
import { formatDate } from "../helperFunctions/general/DateFunctions";
import { updateDeadline } from "@/firebaseFunctions/deadlines/deadlinePut";
import { deleteDeadlineRecord } from "@/firebaseFunctions/deadlines/deadlineDelete";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import {
    DeadlineFormInput,
    DeadlineWithTimestamp,
} from "@/types/Deadline/deadlineTypes";
// ==========================etc==========================

// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export function DeadlineRow({
    deadline,
    deadlineId,
}: {
    deadline: DeadlineWithTimestamp;
    deadlineId: string;
}) {
    // ===============constants===============
    const {
        userId: deadlineUserId,
        description: deadlineDescription,
        addedDateTime,
        updatedDateTime,
    } = deadline;

    const { userId } = useUser();
    const { teamId } = useTeam();
    const toast = useToast();

    // ===============states===============
    const [description, setDescription] = useState<string>(deadlineDescription);
    const [editing, setEditing] = useState<boolean>(false);

    // ===============helper functions (will not be directly triggered)===============
    const handleEnableEditing = () => {
        setEditing(true);
    };
    const cancelEditing = () => {
        setDescription(deadlineDescription);
        setEditing(false);
    };

    // ===============main functions (will be directly triggered)===============

    const handleUpdateDeadline = async () => {
        if (description.length === 0) {
            toast({
                title: "Description cannot be empty",
                status: "error",
            });
        } else {
            const updatedDeadline: DeadlineFormInput = {
                ...deadline,
                description,
            };
            const updatedDeadlineRes = await updateDeadline(
                teamId ? teamId : userId,
                deadlineId,
                updatedDeadline
            );
            if (updatedDeadlineRes) {
                toast({
                    title: "Deadline updated",
                    status: "success",
                });
                setEditing(false);
            } else {
                toast({
                    title: "Error updating deadline",
                    status: "error",
                });
            }
        }
    };

    const handleDeleteDeadline = async () => {
        const deleteDeadlineRes = await deleteDeadlineRecord(
            teamId ? teamId : userId,
            deadlineId
        );
        if (deleteDeadlineRes) {
            toast({
                title: "Deadline deleted",
                status: "success",
            });
        } else {
            toast({
                title: "Error deleting deadline",
                status: "error",
            });
        }
    };
    // ===============useEffect===============

    return (
        <CustomContainer>
            {!editing ? (
                <>
                    {" "}
                    <Heading fontWeight={"normal"} size={"lg"}>
                        {description}
                    </Heading>
                </>
            ) : (
                <>
                    <CustomFormInput
                        formId={"editDeadline"}
                        value={description}
                        changeHandler={setDescription}
                        placeholder={"Update description"}
                        formLabel="Description:"
                    />
                </>
            )}
            <br />
            <Text>Created at: {formatDate(addedDateTime)}</Text>
            <Text>Last Modified: {formatDate(updatedDateTime)}</Text>
            <Box p={2}>
                {!editing ? (
                    <>
                        <CustomButton
                            margin={2}
                            isDisabled={deadlineUserId !== userId}
                            clickFunction={handleEnableEditing}
                            buttonText={"Edit"}
                        />
                        <CustomButton
                            margin={2}
                            isDisabled={deadlineUserId !== userId}
                            clickFunction={handleDeleteDeadline}
                            buttonColor="#AA0000"
                            buttonText={"Delete"}
                        />
                    </>
                ) : (
                    <>
                        <CustomButton
                            margin={2}
                            clickFunction={cancelEditing}
                            buttonColor="#484747"
                            buttonText={"Cancel"}
                        />
                        <CustomButton
                            margin={2}
                            clickFunction={handleUpdateDeadline}
                            buttonText={"Update"}
                        />
                    </>
                )}
            </Box>
        </CustomContainer>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
