"use client";
// ===================================all imports===================================

// ==========================import from react==========================
import { useState, useCallback } from "react";
// ==========================import from next==========================
// ==========================import state management==========================
import useUser from "@/store/userStore";
// ==========================import chakraui components==========================
import {
    Box,
    useToast,
    Text,
    Link,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Button,
} from "@chakra-ui/react";
import { FiFile, FiFilePlus, FiTrash } from "react-icons/fi";

// ==========================import custom components==========================
import CustomContainer from "../custom/CustomContainer";
import CustomButton from "../custom/CustomButton";
import CustomGrid from "../custom/CustomGrid";

// ==========================import external functions==========================
import { addFilesToTeam } from "@/firebaseFunctions/documents/documentAdd";
// ==========================import external variables==========================

// ==========================import types/interfaces==========================
import { DocumentEntry } from "@/types/Documents/documentTypes";
// ==========================etc==========================
import { useDropzone } from "react-dropzone";
import { Heading } from "@chakra-ui/react";
// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

// folderId is a string
// takes in teamId if its not inside folder
export default function FileDropzone({ folderId }: { folderId: string }) {
    // ===============constants===============
    const toast = useToast();
    const { userId } = useUser();
    // ===============states===============
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [entering, setEntering] = useState<boolean>(false);

    // ===============helper functions (will not be directly triggered)===============

    // ===============main functions (will be directly triggered)===============
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const fileCount: number = acceptedFiles.length;
            toast({
                title: `Adding ${fileCount} file(s)`,
                status: "info",
            });
            acceptedFiles.map((file: File) => {
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    fileId: Math.random().toString(36).substr(2, 9),
                });
                selectedFiles.push(file);
            });

            setSelectedFiles(selectedFiles);
            setEntering(false);
            toast({
                title: `Added ${fileCount} file(s)`,
                status: "success",
            });
        },
        [selectedFiles]
    );

    const deleteFile = (id: string) => {
        setSelectedFiles([
            ...selectedFiles.filter((file: DocumentEntry) => {
                return file.fileId != id;
            }),
        ]);
    };

    const clearSelection = () => {
        setSelectedFiles([]);
    };

    const uploadFiles = async () => {
        toast({
            title: "Uploading file(s)",
            status: "info",
        });
        try {
            await addFilesToTeam(folderId, selectedFiles, userId);
            toast({
                title: "File(s) uploaded",
                status: "success",
            });
            setSelectedFiles([]);
        } catch (err) {
            console.log(err);
            toast({
                title: "File(s) failed to upload",
                status: "error",
            });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const selectedImages = selectedFiles?.map((file: DocumentEntry) => {
        const { fileId, name, preview } = file;
        return (
            <Menu key={fileId}>
                <MenuButton
                    as={Button}
                    aria-label="Options"
                    width={"100%"}
                    rightIcon={<FiFile />}
                    background="white"
                    boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                >
                    <Text
                        textAlign={"left"}
                        overflow="hidden"
                        textOverflow={"ellipsis"}
                    >
                        {name}
                    </Text>
                    {/* </CustomContainer> */}
                </MenuButton>
                <MenuList>
                    <Link href={preview} target="_blank">
                        <MenuItem>Preview</MenuItem>
                    </Link>
                    <MenuItem
                        onClick={() => {
                            deleteFile(fileId);
                        }}
                    >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    });

    return (
        <Box margin="auto">
            <Heading fontWeight={"normal"} size="md">
                Upload files
            </Heading>
            <br />
            <CustomButton
                buttonText={`Upload ${selectedFiles.length} files`}
                clickFunction={uploadFiles}
                LeftButtonIcon={FiFilePlus}
                isDisabled={selectedFiles.length == 0}
            />
            <CustomButton
                buttonText={"Clear Selection"}
                buttonColor="#AA0000"
                clickFunction={clearSelection}
                LeftButtonIcon={FiTrash}
                isDisabled={selectedFiles.length == 0}
            />
            <Box width={["100%", null, null, "60%", "40%"]}>
                <div
                    {...getRootProps()}
                    onDragEnter={() => {
                        setEntering(true);
                    }}
                    onDragLeave={() => setEntering(false)}
                >
                    <Box
                        width={["100%"]}
                        background={entering ? "black" : "white"}
                        color={entering ? "white" : "black"}
                        boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.2)"}
                        borderRadius={5}
                        padding={2}
                        margin="auto"
                        marginTop={5}
                        marginBottom={5}
                        minHeight={"200px"}
                        transition={
                            "background-color 200ms linear, color 200ms linear"
                        }
                        display="grid"
                    >
                        <input {...getInputProps()} />
                        <Heading
                            fontWeight={"normal"}
                            size="md"
                            margin="auto"
                            textAlign="center"
                        >
                            {entering
                                ? "Drop it like its hawt!"
                                : " Click or drag and drop files here"}
                        </Heading>
                    </Box>
                </div>
            </Box>
            <CustomContainer>
                {selectedFiles.length == 0 ? (
                    <>
                        <Heading fontWeight={"normal"} size="md">
                            No files uploaded, upload some?
                        </Heading>
                    </>
                ) : (
                    <>
                        <CustomGrid gridCols={[2, 4, null]}>
                            {selectedImages}
                        </CustomGrid>
                    </>
                )}
            </CustomContainer>
        </Box>
    );
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components
